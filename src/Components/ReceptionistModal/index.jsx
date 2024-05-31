import React, { useContext } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { promoMsg } from "../../msgs";
import { applicationContext } from "../../context";
import "../ReceptionistModal/receptionist.css";
function ReceptionistModal({}) {
  const { setReceptionistModal } = useContext(applicationContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    minWidth: 350,
    width: "50%",
    bgcolor: "#000000",
    cololr: "#FFF",
    border: "4px solid #FFF",

    boxShadow: 24,
    outline: "none",
    p: 4,
    display: "flex",
    flexDirection: "column",
  };
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll", outline: "none" }}
      fullWidth={true}
      onClick={() => setReceptionistModal(false)}
    >
      <Box sx={style}>
        <div
          style={{
            fontFamily: "Gagalin",
            color: "#FFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            size="small"
            onClick={() => setReceptionistModal(false)}
            style={{
              color: "#ff9900",
              alignSelf: "end",
              //   marginBottom: "13px",
              marginTop: "25px",
            }}
          >
            Close
          </Button>
          <div>
            <h2 style={{ marginBottom: "15px" }}>Provizije:</h2>
            <ul
              style={{
                display: "flex",
                gap: ".5rem",
                listStyle: "numeric",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
              className="ul-rec"
            >
              <li className="li-item">
                <p className="rec-p">Cruise Belgrade 1</p>
                <ul>
                  <li>odrasli: 500 dinara</li>
                  <li>deca 8-12 godina: 250 dinara</li>
                </ul>
              </li>

              <li className="li-item">
                <p className="rec-p">Cruise Belgrade 2</p>
                <ul>
                  <li>odrasli: 400 dinara</li>
                  <li>deca 8-12 godina: 200 dinara</li>
                </ul>
              </li>

              <li className="li-item">
                <p className="rec-p">Cruise Belgrade 3</p>
                <ul>
                  <li>odrasli: 500 dinara</li>
                  <li>deca 8-12 godina: 250 dinara</li>
                </ul>
              </li>

              <li className="li-item">
                <p className="rec-p">Open Bus Morning</p>
                <ul>
                  <li>odrasli:200 dinara</li>
                  <li>deca 0-12 godina:100 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Open Bus Afternoon</p>
                <ul>
                  <li>odrasli:350 dinara</li>
                  <li>deca 0-12 godina:150 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Open Bus + Cruise Tour</p>
                <ul>
                  <li>odrasli:850 dinara</li>
                  <li>deca 0-12 godina:400 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Champagne Night Cruise</p>
                <ul>
                  <li>odrasli: 600 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Belgrade Undergroud</p>
                <ul>
                  <li>odrasli/deca: 600 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Drvengrad & Sargan train</p>
                <ul>
                  <li>odrasli: 1500 dinara</li>
                  <li>deca 0-12 godina: 1000 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Novi Sad & Sremski Karlovci</p>
                <ul>
                  <li>odrasli: 1200 dinara</li>
                  <li>deca: 0-12 godina: 600 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Golubac & Iron gate</p>
                <ul>
                  <li>odrasli: 1500 dinara</li>
                  <li>deca 0-12 godina: 750 dinara</li>
                </ul>
              </li>
            
              <li className="li-item">
                <p className="rec-p">Medieval Monasteries and Resava Cave</p>
                <ul>
                  <li>odrasli: 1500 dinara</li>
                  <li>deca: 0-12 godina: 750 dinara</li>
                </ul>
              </li>
              <li className="li-item">
                <p className="rec-p">Belgrade Big City Tour</p>
                <ul>
                  <li>odrasli: 600 dinara</li>
                  <li>deca 0-12 godina: 300 dinara</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ReceptionistModal;
