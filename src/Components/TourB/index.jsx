import React, { useState } from "react";
import { ModifyButton } from "../ModifyButton";

function TourB({ handleCheckIn, handleNotShown, e }) {
  const [showMod, setShowMod] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {showMod ? (
        <>
          <ModifyButton
            handler={() => handleCheckIn(e, e.id)}
            mod="Checked In"
            setShowMod={setShowMod}
            color='success'
          />
          <ModifyButton
            handler={() => handleNotShown(e.id)}
            mod="Hasn't Shown"
            setShowMod={setShowMod}
          />
        </>
      ) : (
        <p style={{textAlign:'center',padding:'.5rem', background:'green',marginTop:'.5rem',width:'100%'}}>This Reservation has already been reviewed.</p>
      )}
    </div>
  );
}

export default TourB;
