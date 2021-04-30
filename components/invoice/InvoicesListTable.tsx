import React from 'react';
import { Table } from 'reactstrap';

const InvoicesListTable = ({ children }) => {
  return (
    <Table className='table-shopping' responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Invoice for</th>
          <th>Sum without Taxes</th>
          <th>Subtotal with Taxes</th>
          <th>Tax</th>
          <th>Due date</th>
          <th>Print</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default InvoicesListTable;
