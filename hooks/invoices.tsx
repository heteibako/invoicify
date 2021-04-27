import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export default function useAddInvoice() {
  const queryClient = useQueryClient();
  interface IInvoiceData {
    title: string;
    email: string;
    invoiceFor: {
      name: string;
      address: { street: string; houseNumber: string; postCode: string };
    };
  }
  return useMutation((data: IInvoiceData) => axios.post(`http://localhost:3000/api/invoice`, data), {
    onError: (error, variables, context) => {
      console.log(error, variables, context);
    },
    onSuccess: (error, variables, context) => {
      console.log(error, variables, context);
      queryClient.invalidateQueries('invoices');
    },
    onSettled: () => {
      queryClient.invalidateQueries('invoices');
    },
  });
}
