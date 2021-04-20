const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  title: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  invoiceFor: {
    name: String,
    address: {
      street: { type: String, required: [true, 'Please add company street'] },
      houseNumber: { type: String, required: [true, 'Please add company houseNumber'] },
      postCode: { type: String, required: [true, 'Please add company postCode'] },
    },
  },
  sum: { type: Number },
  taxes: { type: Number },
  paid: { type: Boolean },
});

// module.exports = Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
