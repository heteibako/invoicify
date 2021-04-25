import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export default function useAddInvoice() {
  const queryClient = useQueryClient();

  return useMutation((data) => axios.post(`http://localhost:3000/api/invoice`, data), {
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
