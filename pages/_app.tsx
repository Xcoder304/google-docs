import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import AppContext from "../context/AppContext";
import { initailstate, reducer } from "../context/Reducers";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppContext initailstate={initailstate} reducer={reducer}>
        <Component {...pageProps} />
      </AppContext>
    </SessionProvider>
  );
}

export default MyApp;
