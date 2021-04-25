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
      user: '607eb0b6006e2621408d0209',
      invoiceFor: {
        name,
        address: { street, houseNumber, postCode },
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} />
        <p>{errors.title?.message}</p>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>

        <input {...register('street')} />
        <p>{errors.street?.message}</p>

        <input {...register('houseNumber')} />
        <p>{errors.houseNumber?.message}</p>
        <input {...register('postCode')} />
        <p>{errors.postCode?.message}</p>

        <input type='submit' />
      </form>
    </div>
  );
}
