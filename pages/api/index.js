import connectDB from '@config/db';

connectDB();

export default async (req, res) => {
  res.json({ tes: 'test' });
};
