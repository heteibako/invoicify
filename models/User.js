const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: [true, 'Please add first name'] },
  lastName: { type: String, required: [true, 'Please add last name'] },
  invoices: [{ type: mongoose.Types.ObjectId, ref: 'Invoice' }],
  createdAt: { type: Date, default: Date.now },
  company: { type: mongoose.Types.ObjectId, ref: 'Company' },
  password: { type: String, required: [true, 'Please add password'] },
  email: { type: String, required: [true, 'Please add email'] },
});

module.exports = User = mongoose.model('User', UserSchema);
