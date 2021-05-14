import React from 'react';
import { IInvoice } from '@lib/interfaces';
import { fetchInvoices } from '@lib/api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { format } from 'date-fns';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import InvoicesListTable from '@components/invoice/InvoicesListTable';
import { useFetchInvoices } from '@hooks/useFetchInvoices';

const Invoices = () => {
  const { data, isLoading } = useQuery('invoices', fetchInvoices);
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
  const data = await useFetchInvoices();
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
      dehydratedState: data,
    },
  };
}

export default Invoices;
