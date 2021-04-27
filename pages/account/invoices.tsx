import React from 'react';
import { IInvoice } from '@lib/interfaces';
import { fetchInvoices } from '@lib/api';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const Invoices = ({ dehydratedState }) => {
  const data = dehydratedState.queries[0].state.data.data;

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
                <th scope='col'>Invoice title</th>
                <th scope='col'>User</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ title, _id, user }: IInvoice, index: number) => (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{user?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('invoices', fetchInvoices);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Invoices;
