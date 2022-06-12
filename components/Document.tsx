import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";

interface Props {
  time: string;
  fileName: string;
  id: string | any;
}

function Document({ time, fileName, id }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();

  return (
    <div className="w-full bg-gray-200 hover:bg-gray-100 rounded-md transition-all duration-200 ease-out cursor-pointer flex items-center justify-between mb-3">
      <div
        className="flex-1 h-full px-2 py-[7px]"
        onClick={() => router.push(`/doc/${id}`)}
      >
        <div className="flex item-center space-x-2 select-none">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
            alt="docs-icon"
            className="w-8 h-8 object-contain"
          />
          <h4 className="text-lg text-googleTxt_light_2 font-semibold">
            {fileName}
          </h4>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-base text-gray-500 select-none italic">
          {time}
        </span>

        <IconButton
          size="medium"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon className="text-2xl text-gray-500" />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Document;
