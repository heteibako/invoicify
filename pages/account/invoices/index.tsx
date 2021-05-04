import React from 'react';
import { IInvoice } from '@lib/interfaces';
import { fetchInvoices } from '@lib/api';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { format } from 'date-fns';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import InvoicesListTable from '@components/invoice/InvoicesListTable';

const Invoices = ({ dehydratedState }) => {
  const { data } = dehydratedState.queries[0].state;
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='display-4'>Invoices</h1>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <InvoicesListTable>
            {data.map(
              (
                {
                  _id,
                  tax,
                  sum,
                  dueDate,
                  subTotal,
                  invoiceFor: {
                    name,
                    address: { street, houseNumber, postCode },
                  },
                }: IInvoice,
                index: number
              ) => (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>
                    <p>{name}</p>
                    <small className='text-muted'>{street}, </small>
                    <small className='text-muted'>{houseNumber}.</small>

                    <small className='text-muted'>{postCode}</small>
                  </td>
                  <td>{sum}</td>
                  <td>{subTotal}</td>
                  <td>{tax} %</td>
                  <td>{format(new Date(dueDate), 'MM/dd/yyyy')}</td>
                  <td>
                    <Link href={`/account/invoices/${_id}`}>
                      <a className='btn btn-primary btn-sm'>Details</a>
                    </Link>
                  </td>
                </tr>
              )
            )}
          </InvoicesListTable>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('invoices', fetchInvoices);
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
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Invoices;
