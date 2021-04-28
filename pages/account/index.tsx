import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

const Account = ({ session }) => {
  return (
    <>
      {!session ? (
        <h1>You are not logged in</h1>
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 className='display-4'>My Account</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default Account;
