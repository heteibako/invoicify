import connectDB from '@config/db';
import User from '@models/User';
import ErrorResponse from '@lib/errorResponse';

connectDB();

export default async function handler(req, res, next) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      //Validate email and password
      if (!email || !password) {
        // return next(new ErrorResponse('Adja meg az emailt es a jelszot'), 400);
      }
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        // return next(new ErrorResponse('Ehhez az emailhez nem tartozik felhasznalo'), 401);
      }
      //Check if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        // return next(new ErrorResponse('A jelszó nem helyes!'), 401);
      }
      //Create token
      sendTokenResponse(user, 200, res);
    } catch (error) {
      console.log(error);
    }
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
