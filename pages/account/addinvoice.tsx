import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAddInvoice from 'hooks/invoices';

interface IFormInputs {
  title: string;
  name: string;
  street: string;
  houseNumber: string;
  postCode: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
});

export default function AddInvoice() {
  const invoiceQuery = useAddInvoice();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs, e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { name, street, houseNumber, postCode, title } = data;
    invoiceQuery.mutate({
      title,
      user: '6087b6a4754c31028cdeadd7',
      invoiceFor: {
        name,
        address: { street, houseNumber, postCode },
      },
    });
  };

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col'>
          <h1 className='display-4 text-center'>Add Invoice</h1>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-md-4 mx-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-label'></label>
            <input {...register('title')} className='form-control' />
            <p>{errors.title?.message}</p>

            <input {...register('street')} className='form-control' />
            <p>{errors.street}</p>

            <input {...register('houseNumber')} className='form-control' />
            <p>{errors.houseNumber?.message}</p>
            <input {...register('postCode')} className='form-control' />
            <p>{errors.postCode?.message}</p>

            <input type='submit' className='btn btn-primary' />
          </form>
        </div>
      </div>
    </div>
  );
}
