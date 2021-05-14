import React from 'react';
import { fetchUserInvoices } from '@lib/api';
import { QueryClient, useQuery } from 'react-query';
import { getSession } from 'next-auth/client';
import InvoicesListTable from '@components/invoice/InvoicesListTable';
import { dehydrate } from 'react-query/hydration';

const Invoices = ({ userId, dehydratedState }) => {
  const { isLoading } = useQuery('userInvoices', () => fetchUserInvoices(userId));

  if (dehydratedState?.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <h1>No data so far</h1>
      </div>
    );
  }

  if (isLoading) return <h1>Loading</h1>;

  const reducerFn = (key: string) => {
    if (dehydratedState.length === 1) {
      return dehydratedState[0][key];
    }
    const result = dehydratedState.reduce((acc: { a: number }, curr: { a: number }): number => acc[key] + curr[key]);
    return result;
  };
  const total = reducerFn('sum');
  const subTotal = reducerFn('subTotal').toFixed(2);

  return (
    <div className='container'>
      <div className='row align-items-center'>
        <div className='col-md-6'>
          <h1 className='display-4'>Invoices</h1>
        </div>
        <div className='col-md-6'>
          <h3 className='text-right'>
            Sum: <b>&#128; {total}</b>
          </h3>
          <h3 className='text-right'>
            Total with taxes: <b>&#128; {subTotal}</b>
          </h3>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <InvoicesListTable data={dehydratedState} />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const queryClient = new QueryClient();
  const idForUser: string = session?.user._id.toString();
  await queryClient.prefetchQuery('userInvoices', () => fetchUserInvoices(idForUser));
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  const destructureDehydrate = (obj) => {
    return obj.queries[0].state.data;
  };
  return {
    props: {
      dehydratedState: destructureDehydrate(dehydrate(queryClient)),
      userId: idForUser,
    },
  };
}

export default Invoices;
