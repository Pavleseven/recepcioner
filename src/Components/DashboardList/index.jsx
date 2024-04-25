import React, { useContext, useState } from "react";
import { applicationContext } from "../../context";
import ListButtonHandlers from "../ListButtonHandlers";
import "../DashboardList/dashboard.css";
function DashboardList() {
  const { list } = useContext(applicationContext);
  const [filteredList, setFilteredList] = useState([]);
  const [selectValue, setSelectValue] = useState("Select");
  return (
    <div style={{ minHeight: "100vh", background: "black",color:'white' }}>
      <div className="select-div">
        <div className="choose-div">
          <label htmlFor="tour">Choose a Tour:
          <select
            defaultValue={1}
            name="tour"
            id=""
            onChange={(e) => {
              setFilteredList(
                list.filter((el) => el.data.boat === e.target.value)
              );
              console.log(list);
              console.log(filteredList);
              setSelectValue(e.target.value);
            }}
            value={selectValue}
          >
            <option value="select">Select</option>
            <option value="Key Cruise">Key Cruise</option>
            <option value="Turtle Cruise">Turtle Cruise</option>
          </select>
          </label>
          <label htmlFor="dates">Choose a Date: 
          <select
            name="date"
            id=""
            onChange={(e) => {
              setFilteredList((prev) =>
                prev.filter((el) => el.data.date === e.target.value)
              );
            }}
          >
            {filteredList.map((el) => {
              return <option value={el.data.date}>{el.data.date}</option>;
            })}
          </select>
          </label>
        </div>
        <button
          className="select-button"
          onClick={() => {
            setFilteredList([]);
            setSelectValue("Select");
          }}
        >
          Clear
        </button>
      </div>
      <div className="list-content">
        {filteredList.map((el) => {
          return (
            <ul style={{}}>
              <li><span>Ime: </span> {el.data.roomNumber}</li>
              <li><span>Provajder: </span> {el.data.provider || el.data.receptionist}</li>
              <li><span>Hotel: </span> {el.data.userData.hotel_name || "/"}</li>
              <li><span>Odrasli: </span> {el.data.numberOfPassengers}</li>
              <li><span>Deca: </span>{el.data.preteens}</li>
              <li><span>Deca Gratis: </span>{el.data.children}</li>
              <li><span>Cena: </span>
                
                {el.data.priceWithDiscount < el.data.ticketPriceDinars
                  ? el.data.priceWithDiscount
                  : el.data.ticketPriceDinars}
                Dinara/{el.data.ticketPriceEuros}EUR
              </li>
              {el.data.paidWithDinars || el.data.paidWithEuros ? (
                <p style={{ background:'green',padding:'1rem',color:'white',fontWeight:'500'}}>
                  Placeno{" "}
                  {el.data.paidWithDinars 
                    ? "Dinarima"
                    : ""}
                  {el.data.paidWithEuros 
                    ? "EUR"
                    : ""}
                </p>
              ) : (
                  <div className="list-buttons">
                <ListButtonHandlers mod={"Placeno"} ticketID={el.data.id} />
              </div>
            )}
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardList;
