import { fetchInvoice, fetchInvoices } from 'hooks/useFetchInvoices';
import { getSession } from 'next-auth/client';
import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const InvoiceDetail = ({ invoice }) => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <h1>{invoice.dueDate}</h1>
        </div>
      </div>
    </div>
  );
};

// const getInvoices = async () => {
//   const queryClient = new QueryClient();
//   return await queryClient.prefetchQuery('invoices', fetchInvoices);
// };

export const getStaticProps = async (ctx) => {
  const { params } = ctx;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('invoices', fetchInvoices);
  const dehydratedInvoices = dehydrate(queryClient);
  const invoice = dehydratedInvoices.queries[0]?.state.data.data.find((el) => el._id === params.id);

  return {
    props: {
      invoice,
    },
  };
};

export const getStaticPaths = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('invoices', fetchInvoices);
  const dehydratedInvoices = dehydrate(queryClient);
  const params = dehydratedInvoices.queries[0]?.state.data.data.map((el) => el._id);
  const pathsWithParams = params.map((id: string) => ({
    params: { id },
  }));
  return {
    paths: pathsWithParams,
    fallback: 'blocking',
  };
};

export default InvoiceDetail;
