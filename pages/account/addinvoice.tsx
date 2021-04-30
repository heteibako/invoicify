import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAddInvoice from 'hooks/invoices';
import { InvoiceTable } from '@components/invoice/InvoiceTable';
import { GetServerSideProps } from 'next';
import { IFormInputs } from '@lib/interfaces';

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function AddInvoice({ session }) {
  const invoiceQuery = useAddInvoice();
  const router = useRouter();
  const [tax, setTax] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const calculateAmount = (q: number, r: number): number => {
    return q * r;
  };

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'items',
  });

  const watchFieldArray = watch('items');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const filedsArray = fields.map((field) => ({ rate: field.rate, quantity: field.quantity }));
  const totalAmount = filedsArray && filedsArray.reduce((acc, curr) => acc + curr.rate * curr.quantity, 0);
  const totalAmountWithTax = totalAmount + (totalAmount / 100) * tax;

  const onSubmit = (data: IFormInputs) => {
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
      amountPaid,
      items,
    } = data;
    invoiceQuery.mutate({
      title,
      name,
      email: session.user.email,
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
      sum: totalAmount,
      tax,
      amountPaid,
      subTotal: totalAmountWithTax,
    });
    console.log(data);
    router.push('/account/invoices');
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <h2 className='text-center'>New Invoice</h2>
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

        <InvoiceTable>
          {controlledFields.map((field, index) => {
            return (
              <tr key={field.id}>
                <th scope='row'>{index + 1}</th>
                <td>
                  <input
                    {...register(`items.${index}.description`)}
                    className='form-control form-control-sm'
                    name={`items[${index}].description`}
                    placeholder='description'
                  />
                </td>

                <td>
                  <input
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    className='form-control form-control-sm'
                    name={`items[${index}].quantity`}
                    type='number'
                    placeholder='quantity'
                  />
                </td>

                <td>
                  <input
                    {...register(`items.${index}.rate`, { valueAsNumber: true })}
                    className='form-control form-control-sm'
                    name={`items[${index}].rate`}
                    type='number'
                    placeholder='rate'
                  />
                </td>
                <td>{calculateAmount(field.quantity, field.rate)}</td>
                <td>
                  <button className='btn btn-sm btn-danger' type='button' onClick={() => remove(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </InvoiceTable>
        <div className='row'>
          <div className='col'>
            <input type='submit' className='btn btn-primary' />
            <button
              className='btn btn-primary pull-right'
              type='button'
              onClick={() => append({ description: '', rate: 0, quantity: 0 })}>
              Append
            </button>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-2'>
            <input placeholder='tax' className='form-control' onChange={(e) => setTax(Number(e.target.value))} />
          </div>
          <div className='col-8'></div>
          <div className='col-2'>
            <p>total: {totalAmount}</p>
            <p>total with tax: {totalAmountWithTax}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
