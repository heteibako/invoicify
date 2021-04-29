export interface IInvoice {
  name: string;
  title: string;
  createdAt: string;
  invoiceFor: InvoiceFor;
  sum: number;
  tax: number;
  paid: boolean;
  subTotal: number;
  dueDate: string;
  _id: string;
  user: { name: string };
}

export interface InvoiceFor {
  name: string;
  email: string;
  address: {
    street: string;
    houseNumber: string;
    postCode: string;
  };
}
