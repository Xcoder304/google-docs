import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { RandomDocID, getRandomID } from "../utils/CreateRandomId";
import { useRouter } from "next/router";

function CreateDocModal({ isOpen, handleClose }) {
  const [fileName, setFileName] = useState < string > "";
  const { data: session } = useSession();
  const router = useRouter();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 14,
    p: 4,
  };

  const CREATE_FILE = async (e) => {
    e.preventDefault();
    const docid = RandomDocID();
    const id = getRandomID();

    handleClose();
    await setDoc(
      doc(db, "UserDocuments", session?.user?.email, "documents", docid),
      {
        fileName: fileName,
        time: serverTimestamp(),
        id: id,
      }
    );

    setFileName("");
    router.push(`/doc/${docid}`);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box
            sx={style}
            className="rounded-md w-[95%] md:w-[400px] outline-none"
          >
            <form onSubmit={CREATE_FILE}>
              <input
                type="text"
                placeholder="Enter File Name"
                className="w-full px-3 py-3 bg-gray-100 rounded-md focus-within:bg-white focus-within:shadow-md transition-all duration-200 ease-out outline-none border focus-within:border-white"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />

              <div className="flex items-end justify-end mt-3">
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    type="button"
                    variant="outlined"
                    size="medium"
                    color="primary"
                    onClick={handleClose}
                    className="!px-5 !py-2"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="!bg-[#3888e4] hover:!bg-[#1565C0] focus:!bg-[#1565C0] !px-5 !py-2 !capitalize"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CreateDocModal;
