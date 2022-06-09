import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";

function Document() {
  return (
    <div className="w-full bg-gray-200 hover:bg-gray-100 rounded-md transition-all duration-200 ease-out cursor-pointer flex items-center justify-between px-2 py-[6px] mb-3">
      <div className="flex item-center space-x-2 select-none">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
          alt="docs-icon"
          className="w-8 h-8 object-contain"
        />
        <h4 className="text-lg text-googleTxt_light_2 font-semibold">
          file name
        </h4>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-base text-gray-500 select-none italic">
          {new Date().toDateString()}
        </span>

        <IconButton size="medium">
          <MoreVertIcon className="text-2xl text-gray-500" />
        </IconButton>
      </div>
    </div>
  );
}

export default Document;
