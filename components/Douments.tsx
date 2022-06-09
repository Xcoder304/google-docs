import React from "react";
import { IconButton } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Tooltip from "@mui/material/Tooltip";
import Document from "./Document";

function Douments() {
  return (
    <div className="my-5 bg-white">
      <div className="max-w-3xl mx-auto">
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
        </div>
      </div>
    </div>
  );
}

export default Douments;
