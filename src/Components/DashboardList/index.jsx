import React, { useContext, useState } from "react";
import { applicationContext } from "../../context";
import ListButtonHandlers from "../ListButtonHandlers";

function DashboardList() {
  const { list } = useContext(applicationContext);
  const [filteredList, setFilteredList] = useState([]);
  return (
    <div>
      <label htmlFor="tour">
        Choose a Tour:
        <select
          name="tour"
          id=""
          onChange={(e) => {
            console.log(e.target.value);
            setFilteredList(
              list.filter((el) => el.data.boat === e.target.value)
            );
            console.log(list);
            console.log(filteredList);
          }}
        >
          <option value="Key Cruise">Key Cruise</option>
          <option value="Turtle Cruise">Turtle Cruise</option>
        </select>
      </label>
      <div className="list-content">
        {filteredList.map((el) => {
          return (
            <ul style={{}}>
              <li>Ime: {el.data.roomNumber}</li>
              <li>Provajder: {el.data.provider || el.data.receptionist}</li>
              <li>Hotel: {el.data.userData.hotel_name}</li>
              <li>Odrasli: {el.data.numberOfPassengers}</li>
              <li>Deca: {el.data.preteens}</li>
              <li>Deca Gratis: {el.data.children}</li>
              <li>
                 Cena:{" "}
                {el.data.priceWithDiscount < el.data.ticketPriceDinars
                  ? el.data.priceWithDiscount
                  : el.data.ticketPriceDinars}
                Dinara/{el.data.ticketPriceEuros}EUR
              </li>
             {el.data.paidWithDinars ||  el.data.paidWithEuros ? '' : <div className="list-buttons">
                
               <ListButtonHandlers mod={'Placeno'} ticketID={el.data.id}/>
              
             </div>}
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardList;
