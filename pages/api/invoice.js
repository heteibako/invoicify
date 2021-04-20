import connectDB from '@config/db';
import Invoice from '@models/Invoice';
connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        userId,
        title,
        invoiceFor: {
          name,
          address: { street, houseNumber, postCode },
        },
      } = req.body;
      const invoice = await Invoice.create({
        title,
        invoiceFor: {
          name,
          address: { street, houseNumber, postCode },
        },
      });
      res.status(200).json({ success: true, data: invoice });
      console.log(req.body);
    } catch (error) {
      console.log(error);
    }
  } else {
    // Handle any other HTTP method
  }
}
