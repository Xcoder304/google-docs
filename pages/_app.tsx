import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(30);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });

  return (
    <SessionProvider session={session}>
      <LoadingBar
        color="#1a73e8"
        height={3}
        progress={progress}
        shadow={false}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <link
          rel="icon"
          href="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
