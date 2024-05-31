import { React, useContext } from "react";
import { applicationContext } from "../../context";

import "./choose-boat.scss";
import CardContainer from "../Card";

const ChooseBoat = ({
  setAvailableDates,
  setSelectedRide,
  selectedRide,
  setSelectedId,
  filteredDates,
}) => {
  const { rides } = useContext(applicationContext);

  const sortedRides = [...rides].sort(
    (a, b) => a.data.position - b.data.position
  );
  const filteredRides = sortedRides.filter((a) => a.data.isAvailable);
  return (
    <div className="div-choose-boat">
<div className="marquee-parent">
  <div className="marquee-child">
  Dobro došli u rezervacioni sistem recepcioner.com . Svaku rezervaciju je potrebno odštampati ili  je proslediti gostima u PDF formatu elektronskim putem - whats app, viber, e-mail. <b style={{fontSize:"48px", color:"red"}}>!!</b>⚠️<b style={{fontSize:"48px", color:"red"}}>!!</b> Open bus, od skoro, ima dva meeting pointa - pre podne preko puta  skupštine Srbije a sredom, petkom, subotom popodne i uveče pored francuske ambasade, Pariska 12
  </div>
</div>
      <div className="choose-boat" style={{ alignItems: "flex-start" }}>
        {filteredRides.map((ride, i) => (
          <div key={i} className="card-and-buttons">
            <CardContainer
              ride={ride}
              filteredDates={filteredDates}
              setSelectedId={setSelectedId}
              selectedRide={selectedRide}
              setSelectedRide={setSelectedRide}
              setAvailableDates={setAvailableDates}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseBoat;
