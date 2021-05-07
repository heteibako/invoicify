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

export interface IFormInputs {
  title: string;
  description: string;
  user: string;
  name: string;
  street: string;
  houseNumber: string;
  postCode: string;
  email: string;
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

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
  isConsent: boolean;
  phone: string;
}
