import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';
import NavBar from '@components/Navbar';

export default function Home() {
  return (
    <>
      {/* <div className={styles.container}>
        {session && (
          <>
            Signed in as {session.user.email} <br />
            {session.user.name}
            <button className='btn btn-danger' onClick={() => signOut()}>
              Sign out
            </button>
          </>
        )}
      </div> */}
    </>
  );
}
