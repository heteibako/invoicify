const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  title: String,
  invoiceNumber: String,
  logo: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, default: Date.now },
  paymentTerm: String,
  billTo: String,
  shipTo: String,
  notes: String,
  terms: String,
  invoiceFor: {
    name: String,
    address: {
      street: { type: String },
      houseNumber: { type: String },
      postCode: { type: String },
    },
  },
  items: [],
  sum: { type: Number },
  tax: { type: Number },
  amountPaid: { type: Number },
  subTotal: { type: Number },
  balance: { type: Number },
});

module.exports = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
