import React from "react";
import IconButton from "@mui/material/IconButton";
import { Menu, Search, Apps } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import MenuComponet from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="py-3 px-2 lg:px-4 shadow-md bg-white flex items-center justify-between sticky top-0 left-0 z-30">
      <div className="flex items-center space-x-1 md:space-x-3 lg:space-x-3">
        <IconButton size="large">
          <Menu className="text-2xl" />
        </IconButton>

        <div className="flex items-center space-x-2 cursor-pointer select-none">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
            alt="google-docs-icon"
            className="h-10 w-10 "
          />

          <h3 className="text-[22px] hidden md:inline-flex lg:inline-flex text-googleTxt_light font-medium capitalize ">
            docs
          </h3>
        </div>
      </div>

      <div className="w-[40%] md:w-[55%] lg:w-[55%]">
        <div className="w-full pl-0 md:pl-1 pr-3 flex items-center space-x-0  md:space-x-2 lg:space-x-2 bg-gray-100 rounded-md focus-within:bg-white focus-within:shadow-md transition-all duration-200 ease-out">
          <IconButton size="medium">
            <Search className="text-2xl text-gray-700" />
          </IconButton>
          <input
            type="text"
            placeholder="Search"
            className="w-full py-3 bg-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <IconButton size="medium">
          <Apps className="text-2xl text-gray-500" />
        </IconButton>

        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 34, height: 34 }}>M</Avatar>
        </IconButton>

        <MenuComponet
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MenuComponet>
      </div>
    </header>
  );
}

export default Header;
