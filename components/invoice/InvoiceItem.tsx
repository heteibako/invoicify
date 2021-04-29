import React from 'react';
interface IItemProps {
  index: number;
  description: string;
  quantity: number;
  rate: number;
  amount?: number;
  handleDelete: (desc) => void;
}
export const InvoiceItem = ({ index, description, quantity, rate, handleDelete }: IItemProps) => {
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
      <td>
        <button value={index} className='btn btn-danger btn-sm' onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};
