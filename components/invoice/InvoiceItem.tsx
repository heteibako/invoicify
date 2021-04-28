import React from 'react';
interface IItemProps {
  index: number;
  description: string;
  quantity: number;
  rate: number;
  amount?: number;
}
export const InvoiceItem = ({ index, description, quantity, rate }: IItemProps) => {
  const calculateAmount = () => {
    return quantity * rate;
  };
  return (
    <tr>
      <th scope='row'>{index}</th>
      <td>{description}</td>
      <td>{quantity}</td>
      <td>{rate}</td>
      <td>{calculateAmount()}</td>
    </tr>
  );
};
