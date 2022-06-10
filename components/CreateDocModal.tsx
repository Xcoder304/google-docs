import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

function CreateDocModal({ isOpen, handleClose }: Props) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 14,
    p: 4,
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
          <Box sx={style} className="rounded-md">
            <input
              type="text"
              placeholder="Enter File Name"
              className="w-full px-3 py-3 bg-gray-100 rounded-md focus-within:bg-white focus-within:shadow-md transition-all duration-200 ease-out outline-none border focus-within:border-white"
            />

            <div className="flex items-end justify-end mt-3">
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={handleClose}
                  className="!px-5 !py-2"
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  className="!bg-[#3888e4] hover:!bg-[#1565C0] focus:!bg-[#1565C0] !px-5 !py-2 !capitalize"
                >
                  Create
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CreateDocModal;
