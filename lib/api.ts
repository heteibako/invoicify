import axios from 'axios';

export const fetchInvoices = async () => {
  return await axios.get(`http://localhost:3000/api/invoice`).then((res) => res.data);
};

export const registerUser = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/register', data, config);
  } catch (error) {
    console.log(error);
  }
};
