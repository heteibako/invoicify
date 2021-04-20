const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
  companyName: { type: String, required: [true, 'Please add company name'] },
  taxNumber: { type: String, required: [true, 'Please add company address'] },
  address: {
    street: { type: String, required: [true, 'Please add company street'] },
    houseNumber: { type: String, required: [true, 'Please add company houseNumber'] },
    postCode: { type: String, required: [true, 'Please add company postCode'] },
  },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  logo: String,
});

module.exports = Company = mongoose.model('Company', CompanySchema);
