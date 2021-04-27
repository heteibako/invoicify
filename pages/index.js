import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className={styles.container}>
      {!session && (
        <>
          Not signed in <br />
          <button className='btn btn-primary' onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          {session.user.name}
          <button className='btn btn-danger' onClick={() => signOut()}>
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
