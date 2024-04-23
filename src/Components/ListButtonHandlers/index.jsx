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

export const ListButtonHandlers = ({ handler, mod, ticketID }) => {
  const [open, setOpen] = React.useState(false);
  const [typeOfCurrency, setTypeOfCurrency] = React.useState("");
  const [showPayment, setShowPayment] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async () => {
    const docRef = doc(db, "tickets2024", ticketID);
    const docSnap = await getDoc(docRef);
    const docsData = docSnap.data();
    await updateDoc(doc(db, "tickets2024", ticketID), {
      paidWithDinars: typeOfCurrency === "Dinari" ? true : false,
      paidWithEuros: typeOfCurrency === "EUR" ? true : false,
    });
    console.log(docsData);
    console.log(ticketID);
    console.log(typeOfCurrency);
    setOpen(false);
    setShowPayment(false);
  };

  return (
    <>
      <div style={{ paddingTop: "0" }}>
        <select
          name="currency"
          id=""
          onChange={(e) => {
            setTypeOfCurrency(e.target.value);
          }}
        >
          <option value="Dinari">Dinari</option>
          <option value="EUR">EUR</option>
        </select>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{ padding: ".5rem" }}
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
      
    </>
  );
};

export default ListButtonHandlers;
