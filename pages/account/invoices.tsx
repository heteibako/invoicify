import React from 'react';
import { IInvoice } from '@lib/interfaces';
import { fetchInvoices } from '@lib/api';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
const Invoices = ({ dehydratedState }) => {
  const data = dehydratedState.queries[0].state.data.data;

  return (
    <div>
      <h1>Invoices</h1>
      {data.map(({ title, _id, user }: IInvoice) => (
        <div key={_id}>
          <p>{title}</p>
          <p>{user?.firstName}</p>
          <p>{user?.lastName}</p>
        </div>
      ))}
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
