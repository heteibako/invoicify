import axios from 'axios';
import { RegisterValues } from '@lib/interfaces';

export const fetchInvoices = async () => {
  return await axios.get(`http://localhost:3000/api/invoice`).then((res) => res.data);
};

export const fetchUserInvoices = async (id: string) => {
  const data = await axios.get(`http://localhost:3000/api/invoice`).then((res) => res.data);
  const invoices = data.filter((invoice: { user: { _id: string } }) => invoice.user._id === id);
  return invoices;
};

export const registerUser = async (data: RegisterValues) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/register', data, config);
  } catch (error) {
    console.log(error);
  }
};
