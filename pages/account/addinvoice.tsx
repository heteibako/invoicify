import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAddInvoice from 'hooks/invoices';
import { InvoiceItem } from '@components/invoice/InvoiceItem';
import { InvoiceTable } from '@components/invoice/InvoiceTable';

interface IFormInputs {
  title: string;
  user: string;
  name: string;
  street: string;
  houseNumber: string;
  postCode: string;
  email: string;
  invoiceNumber: string;
  logo: string;
  dueDate: string;
  paymentTerm: string;
  billTo: string;
  shipTo: string;
  notes: string;
  terms: string;
  items: [];
  sum: number;
  tax: number;
  amountPaid: number;
  subTotal: number;
  balance: number;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function AddInvoice() {
  const invoiceQuery = useAddInvoice();
  const router = useRouter();
  const [session] = useSession();
  const email = session?.user.email;

  const [item, setItem] = useState({ description: '', rate: 0, quantity: 0 });
  const [items, setItems] = useState([]);

  const handleItemDelete = (e: { target: { value: number } }) => {
    const array = [...items]; // make a separate copy of the array
    const index = array.indexOf(Number(e.target.value));
    array.splice(index, 1);
    setItems(array);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs, e: { preventDefault: () => void }) => {
    e.preventDefault();
    const {
      title,
      invoiceNumber,
      logo,
      postCode,
      houseNumber,
      street,
      dueDate,
      paymentTerm,
      billTo,
      shipTo,
      notes,
      terms,
      name,
      items,
      sum,
      tax,
      amountPaid,
      subTotal,
      balance,
    } = data;
    invoiceQuery.mutate({
      email,
      title,
      name,
      street,
      houseNumber,
      postCode,
      invoiceNumber,
      logo,
      dueDate,
      paymentTerm,
      billTo,
      shipTo,
      notes,
      terms,
      items,
      sum,
      tax,
      amountPaid,
      subTotal,
      balance,
    });
    router.push('/account/invoices');
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col'>
          <h1 className='display-4 text-center'>New Invoice</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row mt-5'>
          <div className='col-md-4'>
            <div className='row'>
              <div className='col'>
                <div className='form-group mb-3'>
                  <input {...register('name')} className='form-control form-control-sm' placeholder='name' />
                  <small className='text-danger d-block'>{errors.name?.message}</small>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
                <div className='form-group mb-3'>
                  <input {...register('street')} className='form-control form-control-sm' placeholder='street' />
                  <small>{errors.street}</small>
                </div>
              </div>
              <div className='col-4'>
                <div className='form-group mb-3'>
                  <input
                    {...register('houseNumber')}
                    className='form-control form-control-sm'
                    placeholder='house number'
                  />
                  <small>{errors.houseNumber?.message}</small>
                </div>
              </div>
              <div className='col-4'>
                <div className='form-group mb-3'>
                  <input {...register('postCode')} className='form-control form-control-sm' placeholder='PO Code' />
                  <small>{errors.postCode?.message}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* PREVIEW */}
        <div className='row my-3'>
          <div className='col-3'>
            <input
              className='form-control form-control-sm'
              value={item.description}
              name='description'
              onChange={(e) => setItem({ ...item, [e.target.name]: e.target.value })}
              placeholder='description'
            />
          </div>
          <div className='col-3'>
            <input
              className='form-control form-control-sm'
              name='rate'
              value={item.rate}
              onChange={(e) => setItem({ ...item, [e.target.name]: e.target.value })}
              placeholder='rate'
            />
          </div>
          <div className='col-3'>
            <input
              className='form-control form-control-sm'
              name='quantity'
              value={item.quantity}
              onChange={(e) => setItem({ ...item, [e.target.name]: e.target.value })}
              placeholder='quantity'
            />
          </div>

          <div className='col-3'>
            <button
              className='btn btn-primary btn-sm'
              onClick={(e) => {
                e.preventDefault();
                setItems([...items, item]);
              }}>
              Add item
            </button>
          </div>
        </div>
        <InvoiceTable>
          {items.map((inv, i) => (
            <InvoiceItem
              key={i}
              description={inv.description}
              index={i}
              quantity={inv.quantity}
              rate={inv.rate}
              handleDelete={(e) => {
                e.preventDefault();
                handleItemDelete(e);
              }}
            />
          ))}
        </InvoiceTable>
        <div className='row'>
          <div className='col'>
            <input type='submit' className='btn btn-primary' />
          </div>
        </div>
      </form>
    </div>
  );
}
