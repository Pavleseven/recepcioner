import React, { useContext } from "react";
import { applicationContext } from "../../context";
import { Link } from "react-router-dom";
import "../AdminHeader/adminheader.css";

function DashAdmin() {
  const { logOut, user, userData } = useContext(applicationContext);

  return (
    <div
      className="admin-header"
      style={{ width: "100wv", background: "#ff9900" }}
    >
      <h3 style={{ fontFamily: "Gagalin" }}>List Page</h3>

      <Link>
        <button
          className="log-out"
          onClick={logOut}
          style={{
            background: "#ffde17",
            height: "30px",
            width: "80px",
            border: "2px solid black",
          }}
        >
          Log Out
        </button>
      </Link>
    </div>
  );
}

export default DashAdmin;
