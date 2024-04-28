import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export const ListButtonHandlers = ({ handler, mod, ticketID }) => {
  const [open, setOpen] = React.useState(false);
  const [typeOfCurrency, setTypeOfCurrency] = React.useState("");
  const [showPayment, setShowPayment] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async () => {
    const docRef = doc(db, "ticketspavle", ticketID);
    const docSnap = await getDoc(docRef);
    const docsData = docSnap.data();
    if (typeOfCurrency === "Dinarima" || typeOfCurrency === "EUR") {
      await updateDoc(doc(db, "ticketspavle", ticketID), {
        paidWithDinars: typeOfCurrency === "Dinarima" ? true : false,
        paidWithEuros: typeOfCurrency === "EUR" ? true : false,
      });
      console.log(typeOfCurrency);
      setOpen(false);
      setShowPayment(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      {!showPayment ? (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <select
            name="currency"
            id=""
            onChange={(e) => {
              if (e.target.value !== "select") {
                setTypeOfCurrency(e.target.value);
              }
            }}
            style={{ padding: ".7rem", margin: "0" }}
          >
            <option value="select">Select</option>
            <option value="Dinarima">Dinari</option>
            <option value="EUR">EUR</option>
          </select>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            style={{ padding: ".5rem" }}
            color="warning"
          >
            {mod}
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"CONFIRM "}
              {mod}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action can't be reverted
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>NO</Button>
              <Button color="error" onClick={handleUpdate} autoFocus>
                YES
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <p
          style={{
            background: "green",
            padding: "1rem",
            color: "white",
            fontWeight: "500",
          }}
        >
          Placeno u {typeOfCurrency}
        </p>
      )}
    </>
  );
};

export default ListButtonHandlers;
