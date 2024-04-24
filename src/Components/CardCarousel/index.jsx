import React from "react";
import { Carousel } from "react-responsive-carousel";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../CardCarousel/carousel.css";
import Button from "@mui/material/Button";
import { imgs } from "./imgs";
function CardCarousel({ handleCarousel, itinerary }) {
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
    border: "2px solid #000",
    // margin: "auto",
    // height: "500px",
    // margin: "15rem 0",

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
      style={{ overflow: "scroll" }}
      fullWidth={true}
    >
      <Box sx={style} className="carousel-box">
        <Button
          size="small"
          onClick={handleCarousel}
          style={{
            color: "#ed6c02",
            alignSelf: "end",
            marginBottom: "13px",
          }}
        >
          Close
        </Button>

       
          
            <img src={itinerary} alt="carousel" className="carousel-img"/>
          
       
      </Box>
    </Modal>
  );
}

export default CardCarousel;
