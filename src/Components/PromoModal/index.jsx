import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { promoMsg } from "../../msgs";
function PromoModal({ handlePromo }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    minWidth: 400,
    width: "50%",
    bgcolor: "#000000",
    cololr: "#FFF",
    border: "4px solid #FFF",

    boxShadow: 24,
    outline: "none",
    p: 4,
    display: "flex",
    flexDirection: "column",
  };
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll", outline: "none" }}
      fullWidth={true}
    >
      <Box sx={style}>
        <div
          style={{
            fontFamily: "Gagalin",
            color: "#FFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            size="small"
            onClick={handlePromo}
            style={{
              color: "red",
              alignSelf: "end",
              marginBottom: "13px",
            }}
          >
            Close
          </Button>
          <p>{promoMsg}</p>
        </div>
      </Box>
    </Modal>
  );
}

export default PromoModal;
