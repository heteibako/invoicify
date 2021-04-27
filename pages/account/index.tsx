import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const Account = () => {
  const [session] = useSession();

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

export default Account;
