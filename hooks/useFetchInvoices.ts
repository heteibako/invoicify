import axios from 'axios';

export const fetchInvoices = async () => {
  return await axios.get('http://localhost:3000/api/invoice').then((res) => res.data);
};