const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: [true, 'Please add first name'] },
  lastName: { type: String, required: [true, 'Please add last name'] },
  invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
  createdAt: { type: Date, default: Date.now },
  company: { type: mongoose.Types.ObjectId, ref: 'Company' },
  password: { type: String, minlength: 6, select: false, required: [true, 'Please add password'] },
  email: { type: String, unique: true, required: [true, 'Please add email'] },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
    required: false,
    default: 'placeholder.jpg',
  },
  isConsent: {
    type: Boolean,
    required: [true, 'Please accept the therms and conditions'],
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  // eslint-disable-next-line no-undef
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    // eslint-disable-next-line no-undef
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GEnerate and hash password token

UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// module.exports = User = mongoose.model('User', UserSchema);
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
