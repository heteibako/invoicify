import React from 'react';
import { IInvoice } from '@lib/interfaces';
import { fetchInvoices } from '@lib/api';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { format } from 'date-fns';
import { getSession } from 'next-auth/client';

const Invoices = ({ dehydratedState }) => {
  const { data } = dehydratedState.queries[0].state.data;
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='display-4'>Invoices</h1>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Invoice for</th>
                <th scope='col'>Sum without Taxes</th>
                <th scope='col'>Subtotal with Taxes</th>
                <th scope='col'>Tax</th>
                <th scope='col'>Due date</th>
                <th scope='col'>Print</th>
              </tr>
            </thead>
            <tbody>
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
                      <button className='btn btn-primary btn-sm'>Print</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
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
