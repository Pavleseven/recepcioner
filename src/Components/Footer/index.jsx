import React, { useContext } from "react";
import "./footer.scss";
import { applicationContext } from "../../context";

const Footer = () => {
  const { userData } = useContext(applicationContext);
  return (
    <div
      className="div-footer"
      onClick={() => {
      }}
    >
      {userData ? (
        <>
          <span>Reservation support:</span>{" "}
          <a
            href="tel:0693339696"
            style={{
              padding: "10px",
              paddingTop: "13px",
              backgroundColor: "#ffde17",
              borderRadius: "7px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            0693339696
          </a>
        </>
      ) : (
        <span>Only for Receptionist Club members</span>
      )}
    </div>
  );
};

export default Footer;
