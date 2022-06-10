import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Douments from "../components/Douments";
import CreateDocModal from "../components/CreateDocModal";

const Home: NextPage = () => {
  const [isModalopen, setisModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setisModalOpen(true);

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

      <CreateDocModal
        isOpen={isModalopen}
        handleClose={() => setisModalOpen(false)}
      />

      <div className="w-full bg-gray-100 py-4">
        {/* wapper */}
        <div className="max-w-3xl mx-auto">
          <div className="w-full flex item-center justify-between">
            <span className="text-googleTxt_light_2 text-base capitalize font-medium select-none">
              Start a new document
            </span>
            <IconButton size="medium">
              <MoreVertIcon className="text-2xl text-gray-500" />
            </IconButton>
          </div>

          <div
            className="w-32 h-40 bg-white flex items-center justify-center cursor-pointer select-none rounded-[5px] border hover:border-blue-400"
            onClick={handleOpenModal}
          >
            <img
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              alt="plus-icon"
              className="w-32 h-32 object-cover"
            />
          </div>

          <p className="text-googleTxt_light_2 text-base mt-2 capitalize font-medium select-none">
            blank
          </p>
        </div>
      </div>

      <Douments />
    </div>
  );
};

export default Home;
