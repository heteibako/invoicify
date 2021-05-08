import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface IInvoiceData {
  title: string;
  email: string;
  name?: string;
  street: string;
  houseNumber: string;
  postCode: string;
  user?: string;
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
}
export default function useAddInvoice() {
  const queryClient = useQueryClient();

  return useMutation((data: IInvoiceData) => axios.post(`http://localhost:3000/api/invoice`, data), {
    onError: (error, variables, context) => {
      // console.log(error, variables, context);
    },
    onSuccess: (error, variables, context) => {
      // console.log(error, variables, context);
      queryClient.invalidateQueries('invoices');
    },
    onSettled: () => {
      queryClient.invalidateQueries('invoices');
    },
  });
}
