import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link
          rel="icon"
          href="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
        />
      </Head>

      <Header />
    </div>
  );
};

export default Home;
