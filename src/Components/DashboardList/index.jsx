import React, { useContext, useMemo, useState } from "react";
import { applicationContext } from "../../context";
import ListButtonHandlers from "../ListButtonHandlers";
import "../DashboardList/dashboard.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DashboardList() {
  const { list } = useContext(applicationContext);
  const [filteredList, setFilteredList] = useState([]);
  const [selectValue, setSelectValue] = useState("Select");
  const [selectDate, setSelectDate] = useState("Select");
  const [totalPrice, setTotalPrice] = useState({
    dinarPrice: 0,
    eurPrice: 0,
  });
  const styleText = { color: "white", fontWeight: "700" };
  const options = useMemo(
    () =>
      [...new Set(filteredList.map((item) => item.data.date))].map((type) => {
        return { value: type };
      }),
    [filteredList]
  );
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="select-div">
        <div className="choose-div">
          <label htmlFor="tour">
            Choose a Tour:
            <select
              defaultValue={1}
              name="tour"
              id=""
              onChange={(e) => {
                setFilteredList(
                  list.filter(
                    (el) =>
                      el.data.boat === e.target.value &&
                      Date.parse(el.data.date) + 86400000 > Date.now()
                  )
                );
                console.log(filteredList);
                setSelectValue(e.target.value);
              }}
              value={selectValue}
            >
              <option value="select">Select</option>
              <option value="Key Cruise">Key Cruise</option>
              <option value="Turtle Cruise">Turtle Cruise</option>
              <option value="Belgrade Open Bus">Belgrade Open Bus</option>
              <option value="Bus + Cruise Tour">Bus + Cruise Tour</option>
              <option value="Champagne Night Cruise">
                Champagne Night Cruise
              </option>
              <option value="Belgrade Underground">Belgrade Underground</option>
              <option value="Novi Sad & Sremski Karlovci">
                Belgrade Open Bus Morning
              </option>
            </select>
          </label>
          <label htmlFor="dates">
            Choose a Date:
            <select
              name="date"
              id=""
              onChange={(e) => {
                setFilteredList((prev) =>
                  prev.filter((el) => el.data.date === e.target.value)
                );
                setSelectDate(e.target.value);
                setTotalPrice({ dinarPrice: 0, eurPrice: 0 });
              }}
              value={selectDate}
            >
              <option value="select">Select</option>
              {options.map((el) => {
                // if (Date.parse(el.value) + 86400000 > Date.now()) {}
                return <option value={el.value}>{el.value}</option>;
              })}
            </select>
          </label>
        </div>
        <button
          className="select-button"
          onClick={() => {
            setFilteredList([]);
            setSelectValue("Select");
            setSelectDate("Select");
            setTotalPrice(0);
          }}
        >
          Clear
        </button>
        <button
          className="select-button"
          onClick={() => {
            setTotalPrice({
              eurPrice: filteredList
                .filter((el) => el.data.paidWithEuros === true)
                .reduce(function (acc, obj) {
                  return acc + obj.data.ticketPriceEuros;
                }, 0),
              dinarPrice: filteredList
                .filter((el) => el.data.paidWithDinars === true)
                .reduce(function (acc, obj) {
                  return (
                    acc +
                    (obj.data.priceWithDiscount < obj.data.ticketPriceDinars
                      ? obj.data.priceWithDiscount
                      : obj.data.ticketPriceDinars)
                  );
                }, 0),
            });
          }}
        >
          Total Price
        </button>
      </div>
      {window.innerWidth < 700 ? (
        <div className="list-content">
          {filteredList.map((el) => {
            return (
              <>
                <ul style={{}}>
                  <li>
                    <span>Ime: </span> {el.data.roomNumber}
                  </li>
                  <li>
                    <span>Provajder: </span>{" "}
                    {el.data.provider || el.data.receptionist}
                  </li>
                  <li>
                    <span>Hotel: </span> {el.data.userData.hotel_name || "/"}
                  </li>
                  <li>
                    <span>Odrasli: </span> {el.data.numberOfPassengers}
                  </li>
                  <li>
                    <span>Deca: </span>
                    {el.data.preteens}
                  </li>
                  <li>
                    <span>Deca Gratis: </span>
                    {el.data.children}
                  </li>
                  <li>
                    <span>Cena: </span>
                    {el.data.priceWithDiscount < el.data.ticketPriceDinars
                      ? el.data.priceWithDiscount
                      : el.data.ticketPriceDinars}
                    Dinara/{el.data.ticketPriceEuros}EUR
                  </li>
                  {el.data.paidWithDinars || el.data.paidWithEuros ? (
                    <p
                      style={{
                        background: "green",
                        padding: "1rem",
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      Placeno {el.data.paidWithDinars ? "Dinarima" : ""}
                      {el.data.paidWithEuros ? "EUR" : ""}
                    </p>
                  ) : (
                    <div className="list-buttons">
                      <ListButtonHandlers
                        mod={"Placeno"}
                        ticketID={el.data.id}
                      />
                    </div>
                  )}
                </ul>
              </>
            );
          })}
          <p>
            Total price : {totalPrice.dinarPrice} Dinara/ {totalPrice.eurPrice}{" "}
            EUR{" "}
          </p>
        </div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1050,
            alignSelf: "center",
            backgroundColor: "#1E1E1E",
          }}
        >
          <Table sx={{ maxWidth: 1050 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={styleText}>
                  Ime
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  Provajder
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  Hotel
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  Odrasli
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  Deca
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  Deca Gratis
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  Cena
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  Nacin Placanja
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((row) => (
                <TableRow
                  key={row.roomNumber}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {row.roomNumber}
                  </TableCell> */}
                  <TableCell align="center" sx={styleText}>
                    {row.data.roomNumber}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.provider || row.data.receptionist}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.userData.hotel_name || "/"}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.numberOfPassengers}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.preteens}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.children}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.priceWithDiscount < row.data.ticketPriceDinars
                      ? row.data.priceWithDiscount
                      : row.data.ticketPriceDinars}
                    Dinara / {row.data.ticketPriceEuros}EUR
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.paidWithDinars || row.data.paidWithEuros ? (
                      <p
                        style={{
                          background: "green",
                          padding: "1rem",
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        Placeno {row.data.paidWithDinars ? "Dinarima" : ""}
                        {row.data.paidWithEuros ? "EUR" : ""}
                      </p>
                    ) : (
                      <div className="list-buttons">
                        <ListButtonHandlers
                          mod={"Placeno"}
                          ticketID={row.data.id}
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {window.innerWidth > 700 ? (
        <p style={{ alignSelf: "center", marginTop: "2rem" }}>
          Total price : {totalPrice.dinarPrice} Dinara/ {totalPrice.eurPrice}{" "}
          EUR{" "}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardList;
