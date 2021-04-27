import connectDB from '@config/db';
import User from '@models/User';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, password, email, isConsent, phone, company } = req.body;
      const user = await User.create({
        name,
        password,
        email,
        isConsent,
        phone,
        company,
      });
      sendTokenResponse(user, 200, res);
    } catch (error) {
      console.log(error);
    }
  } else {
    // Handle any other HTTP method
  }
}

// Get token from model, create cookie and send response
export const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.json({
    success: true,
    token,
  });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
