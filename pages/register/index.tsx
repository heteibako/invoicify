import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '@lib/api';

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  isConsent: boolean;
  phone: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  isConsent: yup.boolean().required(),
  phone: yup.string(),
});

const Register = () => {
  const router = useRouter();
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
    router.push('/auth/signin');
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-4 mt-3 mx-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-label'>Name</label>
            <input {...register('name')} type='text' className='form-control' />
            <p>{errors.name?.message}</p>
            <label className='form-label'>E-mail</label>
            <input {...register('email')} type='email' className='form-control' />
            <p>{errors.email?.message}</p>
            <label className='form-label'>Password</label>
            <input {...register('password')} type='password' className='form-control' />
            <p>{errors.password?.message}</p>

            <div className='form-check'>
              <input type='checkbox' {...register('isConsent')} className='form-check-input' />
              <label className='form-check-label'>Consent</label>
            </div>
            <p>{errors.isConsent?.message}</p>
            <label className='form-label'>Phone</label>
            <input {...register('phone')} className='form-control' />
            <p>{errors.phone?.message}</p>
            <input type='submit' className='btn btn-md btn-primary' />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
