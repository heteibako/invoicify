import connectDB from '@config/db';
import Invoice from '@models/Invoice';

connectDB();

export default async function handler(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        const invoices = await Invoice.findById(req.query.id);
        res.status(200).json(invoices);
        break;
    }
  } catch (error) {
    console.log('error called');
    console.log(error);
  }
}
