import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '@lib/api';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isConsent: boolean;
  phone: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  isConsent: yup.boolean().required(),
  phone: yup.string(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data, e: { preventDefault: () => void }) => {
    e.preventDefault();
    registerUser(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} />
        <p>{errors.firstName?.message}</p>

        <input {...register('lastName')} />
        <p>{errors.lastName?.message}</p>

        <input {...register('email')} />
        <p>{errors.email?.message}</p>

        <input {...register('password')} />
        <p>{errors.password?.message}</p>

        <input type='checkbox' {...register('isConsent')} />
        <label>Consent</label>
        <p>{errors.isConsent?.message}</p>

        <input {...register('phone')} />
        <p>{errors.phone?.message}</p>

        <input type='submit' />
      </form>
    </div>
  );
};
export default Register;
