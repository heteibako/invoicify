import React from 'react';
import { fetchUserInvoices } from '@lib/api';
import { QueryClient, useQuery } from 'react-query';
import { getSession } from 'next-auth/client';
import InvoicesListTable from '@components/invoice/InvoicesListTable';
import { dehydrate } from 'react-query/hydration';

const Invoices = ({ userId }) => {
  const { data, isLoading } = useQuery('userInvoices', () => fetchUserInvoices(userId));
  const reducerFn = (arr: any[], key: string): number => {
    const result = arr?.reduce((acc: { a: number }, curr: { a: number }): number => {
      return acc[key] + curr[key];
    });
    return result;
  };
  const total = reducerFn(data, 'sum');
  const subTotal = reducerFn(data, 'subTotal');
  if (isLoading) return <h1>Loading</h1>;

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
          <InvoicesListTable data={data} />
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
  return {
    props: {
      invoices: dehydrate(queryClient),
      userId: idForUser,
    },
  };
}

export default Invoices;
