import { IInvoice } from '@lib/interfaces';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Table } from 'reactstrap';

const InvoicesListTable = ({ data }) => {
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
                <Link href={`/account/invoices/${_id}`}>
                  <a className='btn btn-primary btn-sm'>Details</a>
                </Link>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default InvoicesListTable;
