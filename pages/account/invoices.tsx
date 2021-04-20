import React from 'react';

const Invoices = ({ invoices }) => {
  return (
    <div>
      <h1>Invoices</h1>
      {invoices.data.map(({ title, _id, user }) => (
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
  const res = await fetch(`http://localhost:3000/api/invoice`);
  const invoices = await res.json();

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
