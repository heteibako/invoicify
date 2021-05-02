import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { format } from 'date-fns';
import { fetchInvoices } from 'hooks/useFetchInvoices';

const InvoiceDetail = ({ invoice }) => {
  return (
    <div className='container'>
      {console.log(invoice)}
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
