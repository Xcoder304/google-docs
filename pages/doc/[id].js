import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuComponet from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TimeAgo from "react-timeago";

function Doc({ documentData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return <Login />;

  return (
    <div className="relative">
      <div className="absolute top-36 left-6 z-20">
        <div
          className="hidden lg:flex w-9 h-9 rounded-full cursor-pointer bg-blue-600 items-center justify-center hover:opacity-70 transition-all duration-150 ease-out"
          onClick={() => router.push("/")}
        >
          <ArrowBackIcon className="text-white text-xl" />
        </div>
      </div>
      <header className="w-full px-2 py-2 border-b flex items-center justify-between flex-wrap">
        <Head>
          <title>{documentData?.fileName} - Google Docs</title>
        </Head>
        <div className="flex items-center space-x-2 select-none">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
            alt="login"
            width={44}
            height={44}
            priority
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <div className="flex flex-col items-start justify-start">
            <h4 className="text-xl font-medium text-gray-600">
              {documentData?.fileName}
            </h4>
            <div className="items-center space-x-1 md:space-x-7 hidden lg:flex ">
              <div className="flex items-center space-x-1">
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  file
                </span>
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  edit
                </span>
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  view
                </span>
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  insert
                </span>
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  format
                </span>
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  tools
                </span>
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  extentions
                </span>
                <span className="capitalize py-[2px]  px-[3px] md:px-[6px] text-sm cursor-pointer hover:bg-slate-100 transition-all duration-150 ease-out rounded-sm">
                  help
                </span>
              </div>

              <div>
                <p className="text-gray-400 font-normal underline italic select-none hidden lg:inline-flex">
                  <span className="px-2">create at</span>
                  <TimeAgo date={new Date(documentData.time.seconds * 1000)} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="contained"
            className="!px-6 !py-[7px] !text-white !capitalize !font-medium text-base !bg-[#1a73e8] !rounded-[5px] hover:!opacity-90"
          >
            share
          </Button>

          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className="ml-0 md:ml-2"
          >
            <Avatar
              alt={session?.user?.name || "unknown"}
              src={
                session?.user?.image ? session.user.image : "/broken-image.jpg"
              }
            />
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
                filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar
                alt={session?.user?.name || "unknown"}
                src={
                  session?.user?.image
                    ? session.user.image
                    : "/broken-image.jpg"
                }
              />{" "}
              Profile
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
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </MenuComponet>
        </div>
      </header>

      <TextEditor />
    </div>
  );
}

export default Doc;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const docRef = doc(
    db,
    "UserDocuments",
    session?.user?.email,
    "documents",
    context.query.id
  );
  const docData = await getDoc(docRef);

  return {
    props: {
      session,
      documentData: JSON.parse(JSON.stringify(docData.data())),
    },
  };
};
