import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <div className={styles.container}>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          {session.user.name}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
