import React from 'react';
import { fetchInvoices, fetchUserInvoices } from '@lib/api';
import { QueryClient, useQuery } from 'react-query';
import { getSession } from 'next-auth/client';
import InvoicesListTable from '@components/invoice/InvoicesListTable';
import { dehydrate } from 'react-query/hydration';

const Invoices = ({ userId }) => {
  const { data, isLoading } = useQuery('userInvoices', () => fetchUserInvoices(userId));
  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='display-4'>Invoices</h1>
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
  const idForUser = session?.user._id.toString();
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
