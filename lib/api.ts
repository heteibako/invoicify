import axios from 'axios';

export const fetchInvoices = async () => {
  const res = await fetch(`http://localhost:3000/api/invoice`);
  return await res.json();
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
