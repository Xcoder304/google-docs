import React from "react";
import { IconButton } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Tooltip from "@mui/material/Tooltip";
import Document from "./Document";

function Douments() {
  return (
    <section className="my-5 bg-white pb-3">
      <div className="max-w-3xl mx-auto px-3">
        {/*  */}
        <div className="w-full flex item-center justify-between">
          <span className="text-googleTxt_light_2 text-base capitalize font-medium select-none">
            your recent documents
          </span>
          <Tooltip title="Sort">
            <IconButton size="medium" className="bg-slate-100">
              <SortByAlphaIcon className="text-2xl text-gray-500" />
            </IconButton>
          </Tooltip>
        </div>
        {/*  */}
        <div className="mt-6">
          <Document />
          <Document />
          <Document />
          <Document />
          <Document />
          <Document />
        </div>
      </div>
    </section>
  );
}

export default Douments;
