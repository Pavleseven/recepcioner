import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
function PromoModal({ handlePromo, promoImg}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    minWidth: 300,
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
      style={{ overflow: "scroll", outline: "none"}}
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
              color: "#ff9900",
              alignSelf: "end",
              marginBottom: "13px",
            }}
          >
            Close
          </Button>
          <img style={{height:"100%", maxHeight:"700px", objectFit:"contain"}} src={`${process.env.PUBLIC_URL}/promo-slike/${promoImg}`}></img>
        </div>
      </Box>
    </Modal>
  );
}

export default PromoModal;
