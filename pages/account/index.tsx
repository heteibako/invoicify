import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import SectionHeader from '@components/common/SectionHeader';

const Account = ({ session }): JSX.Element => {
  const { user } = session;
  return (
    <>
      {!session ? (
        <h1>You are not logged in</h1>
      ) : (
        <div className='container'>
          <SectionHeader title='My Account' />
          <div className='row mt-3'>
            <div className='col'>
              <h6>Name: {user?.name}</h6>
              <h6>Phone: {user?.phone}</h6>
            </div>
          </div>
          <SectionHeader title='Income' />
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
