import connectDB from '@config/db';
import Invoice from '@models/Invoice';
import User from '@models/User';

connectDB();

export default async function handler(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        const {
          title,
          invoiceNumber,
          logo,
          email,
          dueDate,
          paymentTerm,
          billTo,
          shipTo,
          notes,
          terms,
          name,
          street,
          houseNumber,
          postCode,
          items,
          sum,
          tax,
          amountPaid,
          subTotal,
          balance,
        } = req.body;
        const userId = await User.findOne({ email });
        const invoice = await Invoice.create({
          user: userId._id,
          title,
          invoiceNumber,
          logo,
          dueDate,
          paymentTerm,
          billTo,
          shipTo,
          notes,
          terms,
          invoiceFor: {
            name,
            address: { street, houseNumber, postCode },
          },
          items,
          sum,
          tax,
          amountPaid,
          subTotal,
          balance,
        });

        res.status(200).json({ success: true, data: invoice });
        break;

      case 'GET':
        const invoices = await Invoice.find({}).populate({ path: 'user', select: ' -password  -createdAt' });

        res.status(200).json(invoices);
        break;
    }
  } catch (error) {
    console.log('error called');
    console.log(error);
  }
}
