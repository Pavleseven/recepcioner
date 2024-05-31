import React, { useContext, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { applicationContext } from "../../context";
import "../TimeTablePage/timetable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../Components/Header";
import Cross from "./Cross";
const styleText = { color: "white", fontWeight: "700" };

const getToday = () => {
  const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month < 10 ? "0"+ month: month}-${day < 10 ? "0" + day : day}`;
return currentDate
}
const getTomorrow= () => {
  const date = new Date();

let day = date.getDate() + 1;
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month < 10 ? "0"+ month: month}-${day < 10 ? "0" + day : day}`;
return currentDate
}
function TimeTablePage() {
  const { rides } = useContext(applicationContext);
  const [selectedDay, setSelectedDay] = useState("today");
  const [tours, setTours] = useState([]);
  const sortedRides = [...rides].sort(
    (a, b) => a.data.position - b.data.position
  );
  useEffect(() => {
    const fetchAllDocs = async () => {
      const collectionRef = collection(db, "tours2024");
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setTours(docsData)

    };

    fetchAllDocs();

  }, []);
  const filteredTours = selectedDay === "today" ? tours.filter(tour => tour.id.includes(getToday())) : tours.filter(tour => tour.id.includes(getTomorrow()))
  return (
    <div className="time-table">
      <Header />
       <div className="container">
          <div className="button-container">
            {/* <Button 
              variant="contained" 
              endIcon={selectedDay === "today" ? <DoneOutlineIcon /> : null}
              onClick={()=> setSelectedDay("today")}
              >Today</Button>
            <Button 
            variant="contained" 
            endIcon={selectedDay === "tomorrow" ? <DoneOutlineIcon /> : null}
            onClick={()=> setSelectedDay("tomorrow")}
            >Tomorrow</Button> */}
                  <img
                      src={selectedDay === "today" ?  `${process.env.PUBLIC_URL}/today-check.svg` :`${process.env.PUBLIC_URL}/today.svg`}
                      alt="-icon"
                      className="day-img"
                      
                      onClick={()=> setSelectedDay("today")}
                    />
                      <img
                      src={selectedDay === "tomorrow" ?  `${process.env.PUBLIC_URL}/tomorrow-check.svg` :`${process.env.PUBLIC_URL}/tomorrow.svg`}

                      alt="-icon"
                      className="day-img"
                 
                      onClick={()=> setSelectedDay("tomorrow")}
                    />  
                    </div>

                  {window.innerWidth < 700 ? (
        <div className="list-content">
          {sortedRides.map((el, index) => {
            if(index > 12) return;
            return (
              <>
                <ul style={{}}>
                  <li>
                    <div style={{color: "orange"}}>TOUR NAME: </div>
                    <div>{el.data.name}</div> 
                  </li>
                  <li>
                    <div style={{color: "orange"}}>INCLUDED: </div>
                    <div>{el.data.desc.map(item => item.text).join(" / ")}</div>
                  </li>
                  <li>
                    <div style={{color: "orange"}}>ADULTS PRICE: </div> {el.data.prices.adults } DINARS
                  </li>
                  <li>
                    <div style={{color: "orange"}}>8-12 YEARS KIDS PRICE: </div> {el.data.numberOfPassengers}{el.data.prices.preteens } DINARS
                  </li>
                  <li>
                    <div style={{color: "orange"}}>0-7 KIDS: </div> {el.data.numberOfPassengers}{el.data.prices.children ? (el.data.prices.children ) : 0} DINARS
                    </li>
                  {/* <li>
                    <div style={{color: "orange"}}>CENA SA PROMO: </div> {el.data.numberOfPassengers}<div dangerouslySetInnerHTML={{ __html: el.data.price }}></div>
                  </li> */}
                  <li>
                    <div style={{color: "orange"}}>DEPARTURE: </div>
                    <div>{filteredTours.filter(tour =>(el.data.name+el.id).includes(tour.data.boat)).map(i => i.data.date.slice(-5)+"h").join(" / ") || <Cross />}</div>
                  </li>
                                  <li>
                 <div style={{color: "orange"}}>MEETING POINT TIME: </div>
                  {el.data.meetTime ? (el.data.meetTime / 60000 + " minutes before departure")   : "30 minutes before departure"}

                 </li>    
                
                 <li>
                 <div style={{color: "orange"}}>MEETING POINT: </div>
                  {/* {filteredTours.filter(tour =>(el.data.name+el.id).includes(tour.data.boat)).map(i => i.data.availableSeats).join("\r\n") || <Cross />} */}
                  { el.data.meetinPoint }
                 </li>
                 <li>
                 <div style={{color: "orange"}}>AVAILABILITY: </div>
                  {filteredTours.filter(tour =>(el.data.name+el.id).includes(tour.data.boat)).map(i => i.data.availableSeats+" seats").join(" / ")  || <Cross />}

                 </li>             
                </ul>
              </>
            );
          })}
          
        </div>
      ) :
                    <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1050,
            alignSelf: "center",
            backgroundColor: "#1E1E1E",
            margin: "0 auto" 
          }}
        >
          <Table sx={{ maxWidth: 1050}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={styleText}>
                  TOUR NAME
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  INCLUDED
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  ADULTS PRICE
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  8-12 YEARS KIDS PRICE
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  0-7 YEARS KIDS PRICE
                </TableCell>
                {/* <TableCell align="center" sx={styleText}>
                  CENA SA PROMO
                </TableCell> */}
                <TableCell align="center" sx={styleText}>
                  DEPARTURE
                </TableCell>
                <TableCell align="center" sx={styleText}>
                  METTING POINT TIME
                </TableCell>                
                <TableCell align="center" sx={styleText}>
                  METTING POINT
                </TableCell>                
                <TableCell align="center" sx={styleText}>
                  AVAILABILITY
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRides.map((row, index) => index < 13 && (
                <TableRow
                  key={row.roomNumber}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" sx={styleText}>
                    {row.data.name}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                    {row.data.desc.map(item => item.text).join(" / ")}
                    {/* {row.data.prices.adults + " DINARS"} */}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                  {row.data.prices.adults } DINARS   
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                  {row.data.prices.preteens } DINARS   
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                  {row.data.prices.children ? (row.data.prices.children ) : 0} DINARS   
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                  {filteredTours.filter(tour =>(row.data.name+row.id).includes(tour.data.boat)).map(i => <div>{i.data.date.slice(-5)}h</div>)}
                  {filteredTours.filter(tour =>(row.data.name+row.id).includes(tour.data.boat)).length === 0 && <Cross />}
                  </TableCell>
                  <TableCell align="center" sx={styleText}>
                  {row.data.meetTime ? (row.data.meetTime / 60000 + " minutes before departure")   : "30 minutes before departure"}
                  </TableCell>                  
                  <TableCell align="center" sx={styleText}>
                  {row.data.meetinPoint}
                  </TableCell>  
                  <TableCell align="center" sx={styleText}>
                  {filteredTours.filter(tour =>(row.data.name+row.id).includes(tour.data.boat)).map(i =><div>{i.data.availableSeats} seats</div> )}
                  {filteredTours.filter(tour =>(row.data.name+row.id).includes(tour.data.boat)).length === 0 && <Cross />}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}

        </div>
    </div>
  );
}

export default TimeTablePage;
