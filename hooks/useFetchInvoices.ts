import axios from 'axios';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const fetchInvoices = async () => {
  return await axios.get('http://localhost:3000/api/invoice').then((res) => res.data);
};

export const fetchInvoice = async (id: string) => {
  return await axios.get(`http://localhost:3000/api/invoice/${id}`).then((res) => res.data);
};

export const useFetchInvoices = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('invoices', fetchInvoices);

  const data = dehydrate(queryClient);

  return { data };
};
