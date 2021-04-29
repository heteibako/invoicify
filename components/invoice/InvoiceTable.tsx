export const InvoiceTable = ({ children }) => {
  return (
    <div className='row'>
      <div className='col'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Description</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Rate</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};
