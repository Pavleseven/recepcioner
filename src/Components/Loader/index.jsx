import React from "react";
import ReactLoading from "react-loading";
import { CircularProgress } from "@mui/material";
import "./loader.css";
function Loader({ height }) {
  const newHeight = height;
  return (
    // <div style={{ margin: "20vh auto" }}>
    //   <ReactLoading type={"spin"} color={"orange"} height={350} width={100} />
    // </div>
    // <CircularProgress disableShrink className="loader" />
    <div
      style={{
        height: newHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        width: "100%",
        flexDirection:'column'
      }}
    >
      //{" "}
      <img
        src={`${process.env.PUBLIC_URL}/loaderimg.svg`}
        alt="loader"
        style={{
          width: "190px",
          marginBottom: ".5rem",
          paddingLeft: "1.5rem",
        }}
      />
      <span className="loader">Loading</span>
    </div>
  );
}

export default Loader;
