import React from "react";
import Image from "next/image";
import Head from "next/head";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div>
      <Head>
        <title>Google Docs/Login</title>
        <link
          rel="icon"
          href="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
        />
      </Head>
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
          alt="login"
          width={170}
          height={170}
          priority
        />

        <h3 className="text-gray-500 font-medium text-4xl select-none capitalize">
          google docs
        </h3>

        <Button
          variant="contained"
          size="large"
          className="!mt-4 !capitalize !font-medium !text-lg !bg-[#3888e4] hover:!bg-[#1565C0] focus:!bg-[#1565C0] rounded-lg !py-[9px]"
          onClick={() => signIn()}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
