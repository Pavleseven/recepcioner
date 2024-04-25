import { React, useContext, useState } from "react";
import { applicationContext } from "../../context";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import "./header.css";

const Header = () => {
  const { logOut, user, userData, totalCoins,setReceptionistModal } = useContext(applicationContext);
  const [tooltip, setTooltip] = useState(false);
  const path = useLocation().pathname;
  return (
    <div className="div-header">
      {path.includes("reservation") ? (
        <Link to="/profile">
          <img
            src={`${process.env.PUBLIC_URL}/profileiconlarge.png`}
            alt="profile-icon"
            className="profile-icon"
            style={{ width: "45px", cursor: "pointer" }}
          />
        </Link>
      ) : (
        <Link to="/reservation">
          <img
            src={`${process.env.PUBLIC_URL}/back.svg`}
            alt="profile-icon"
            className="profile-icon"
            style={{ width: "120px", cursor: "pointer", marginTop: ".5rem" }}
          />
        </Link>
      )}
      {!path.includes("reservation") ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
        >
          {tooltip ? (
            <p
              style={{
                position: "absolute",
                top: "100%",
                background: "black",
                color: "white",
                padding: ".5rem",
                borderRadius: ".5rem",
                textTransform: "uppercase",
              }}
            >
              Total Coins
            </p>
          ) : (
            ""
          )}
          <p style={{ fontFamily: "Gagalin", fontSize: "32px" }}>
            {totalCoins}
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/coindugme.svg`}
            alt="coin-icon"
            className="coin-icon"
            style={{ width: "45px", cursor: "pointer" }}
          />
        </div>
      ) : (
        ""
      )}
      {userData ? (
        <h3 style={{ fontFamily: "Gagalin" }} className="profile-name">
          {userData.full_name.toUpperCase()}
        </h3>
      ) : (
        ""
      )}
      <img
        src={`${process.env.PUBLIC_URL}/receptionistlogo.svg`}
        alt="receptionist"
        style={{
          width: "50px",
          // marginBottom: ".5rem",
          // paddingLeft: "1.5rem",
        }}
        onClick={()=>setReceptionistModal(true)}
      />
      {(path === "/admin_page" || path === "/reservation") && (
        <Link>
          <button className="log-out" onClick={logOut} style={{background:'#ffde17',height:'30px',width:'80px',border:'2px solid black'}}>
            Log Out
          </button>
        </Link>
        // <img
        //   src={`${process.env.PUBLIC_URL}/logout.svg`}
        //   alt="logout"
        //   onClick={logOut}
        //   style={{
        //     width: "190px",
        //     marginBottom: ".5rem",
        //     paddingLeft: "1.5rem",
        //   }}
        // />
      )}
    </div>
  );
};

export default Header;
