export interface IInvoice {
  firstName: string;
  lastName: string;
  title: string;
  createdAt: string;
  invoiceFor: InvoiceFor;
  sum: number;
  taxes: number;
  paid: boolean;
  _id: string;
  user: { firstName: string; lastName: string };
}

export interface InvoiceFor {
  name: string;
  address: {
    street: string;
    houseNumber: string;
    postCode: string;
  };
}
