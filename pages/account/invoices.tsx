import React from 'react';
import { IInvoice } from '@lib/interfaces';
import { fetchInvoices } from '@lib/api';
import { useQuery } from 'react-query';
const Invoices = ({ invoices }) => {
  const { data } = useQuery('invoices', fetchInvoices, { initialData: invoices });
  return (
    <div>
      <h1>Invoices</h1>
      {data.data.map(({ title, _id, user }: IInvoice) => (
        <div key={_id}>
          <p>{title}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const invoices = await fetchInvoices();

  if (!invoices) {
    return {
      notFound: true,
    };
  }

  return {
    props: { invoices }, // will be passed to the page component as props
  };
}

export default Invoices;
