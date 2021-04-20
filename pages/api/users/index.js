import connectDB from '@config/db';
import User from '@models/User';
connectDB();

export default async function handler(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        const users = await User.findById(req.body.id).populate({ path: 'invoices' });
        res.status(200).json({ success: true, data: users });
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
