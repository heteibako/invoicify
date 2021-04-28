import React from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { signIn, signOut, useSession } from 'next-auth/client';
import NavBar from '@components/Navbar';

function MyApp({ Component, pageProps }) {
  const queryClientRef = React.useRef();
  const [session, loading] = useSession();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  if (loading) return <h1>Loading....</h1>;
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <NavBar
          session={session}
          login={() => signIn()}
          logout={() => signOut()}
          signedInAs={`Signed in as ${session?.user?.email}`}
        />
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
