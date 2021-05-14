import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';
import { format } from 'date-fns';
import { fetchInvoice, fetchInvoices } from 'hooks/useFetchInvoices';

const InvoiceDetail = ({ invoice }) => {
  const {
    query: { id },
  } = useRouter();
  const { data, isLoading } = useQuery(['invoice', { id }], () => fetchInvoice(id.toString()));
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className='container'>
      <div className='row my-3'>
        <div className='col'>
          <h5>Invoice id:{invoice._id}</h5>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col'>
          <p className='text-muted'>created at: {format(new Date(invoice.dueDate), 'MM/dd/yyyy')}</p>
        </div>
      </div>
      <div className='row my-2'>
        <div className='col'>
          <p>Invoice for: </p>
          <p>{invoice.invoiceFor.name}</p>
          <p>
            {invoice.invoiceFor.address.street} {invoice.invoiceFor.address.houseNumber}
          </p>
          <p>{invoice.invoiceFor.address.postCode}</p>
        </div>
      </div>
    </div>
  );
};

const dehydrateDestructure = (arr) => {
  return arr.queries[0]?.state.data;
};

const queryFetching = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('invoices', fetchInvoices);
  const dehydratedInvoices = dehydrate(queryClient);
  return dehydrateDestructure(dehydratedInvoices);
};
export const getStaticProps = async (ctx: { params: { id: string } }) => {
  const { params } = ctx;
  const invoiceQuery = await queryFetching();

  const invoice = invoiceQuery.find((el: { _id: string }) => el._id === params.id);
  return {
    props: {
      invoice,
    },
  };
};

export const getStaticPaths = async () => {
  const invoiceQuery = await queryFetching();
  const params = invoiceQuery.map((el: { _id: string }) => el._id);
  const pathsWithParams = params.map((id: string) => ({
    params: { id },
  }));
  return {
    paths: pathsWithParams,
    fallback: 'blocking',
  };
};

export default InvoiceDetail;
