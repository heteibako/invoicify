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
          email,
          invoiceFor: {
            name,
            address: { street, houseNumber, postCode },
          },
        } = req.body;
        const userId = await User.findOne({ email });
        const invoice = await Invoice.create({
          user: userId._id,
          title,
          invoiceFor: {
            name,
            address: { street, houseNumber, postCode },
          },
        });

        res.status(200).json({ success: true, data: invoice });
        break;

      case 'GET':
        const invoices = await Invoice.find({}).populate({ path: 'user', select: ' -password  -createdAt' });

        res.status(200).json({ success: true, data: invoices });
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
