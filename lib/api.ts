export const fetchInvoices = async () => {
  const res = await fetch(`http://localhost:3000/api/invoice`);
  return await res.json();
};
