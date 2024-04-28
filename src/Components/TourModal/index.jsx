import React, { useContext, useState } from "react";
import { applicationContext } from "../../context";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./tour-modal.scss";
import { DeleteButton } from "../DeleteButton";
import { collection, getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { ModifyButton } from "../ModifyButton";
import TourB from "../TourB";
const TourModal = ({ handleClose, clickedTour }) => {
  const { freshData, setFreshData, allDocs, list } =
    useContext(applicationContext);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  const selectedTour = allDocs.filter((tour) => tour.id === clickedTour.id)[0];
  const handleDelete = async (resID, seats) => {
    const docRef = doc(db, "tourspavle", selectedTour?.id);
    const updatedReservations = selectedTour?.data.reservations.filter(
      (reservation) => reservation.id !== resID
    );
    await updateDoc(docRef, {
      availableSeats: selectedTour.data.availableSeats + seats,
      reservations: updatedReservations,
    });
    setFreshData(!freshData);
  };
  // const children = selectedTour.data.reservations.reduce(
  //   (a, b) => a + b.children,
  //   0
  // );
  const handleCheckIn = async function (res, id) {
    const docRef = doc(db, "ticketspavle", id);
    const docSnap = await getDoc(docRef);
    const docsData2 = docSnap.data();
    await updateDoc(doc(db, "ticketspavle", id), {
      checkedIn: true,
    });
    const userRef = doc(db, "users", docsData2.userID);
    const userSnap = await getDoc(userRef);
    const userDocs = userSnap.data();

    await updateDoc(doc(db, "users", docsData2.userID), {
      coins:
        !docsData2.promoCode && docsData2.specialPromo
          ? userDocs.coins + docsData2.numberOfPassengers * 500
          : userDocs.coins,
    });
  };
  const handleNotShown = async function (id) {
    const docRef = doc(db, "ticketspavle", id);
    const docSnap = await getDoc(docRef);
    const docsData2 = docSnap.data();

    await updateDoc(doc(db, "ticketspavle", id), {
      hasntShown: true,
    });
  };

  return (
    <div className="div-modal-tour" onClick={handleOverlayClick}>
      <div className="modal-container">
        <main>
          <h1>Tour Info</h1>
          <button onClick={handleClose}>X</button>
        </main>
        <section>
          <div className="seats-boat">
            <h5>Available Seats:</h5>
            <p>{selectedTour.data.availableSeats} seats</p>

            <h5>Name of the Tour:</h5>
            <p>{selectedTour.data.boat} </p>
          </div>
          <div className="reservation-passengers">
            <h4>Reservations:</h4>
            {selectedTour.data.reservations?.map((e, i) => (
              <div key={i} className="reservation-content">
                <div className="user-email">
                  <h5>Seller email:</h5>
                  <p>{e.userEmail}</p>
                </div>
                <div className="modal-content">
                  <h5>Reservation room:</h5>
                  <p>{e.roomNumber}</p>
                </div>
                <div className="modal-content">
                  <h5>Number of adults:</h5>
                  <p>{e.numberOfPassengers}</p>
                </div>
                <div className="modal-content">
                  <h5>Preteens:</h5>
                  <p>{e.preteens}</p>
                </div>
                <div className="modal-content">
                  <h5>Small children:</h5>
                  <p>{e.children}</p>
                </div>
                <div className="modal-content">
                  <h5>Is Paid:</h5>
                  <p>{JSON.parse(e.isPaid) === true ? "paid" : "not paid"}</p>
                </div>
                <div className="modal-content">
                  <h5>Phone number:</h5>
                  <p>{e.phoneNumber}</p>
                </div>

                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <ModifyButton
                    handler={() => handleCheckIn(e, e.id)}
                    mod="Checked In"
                  />
                  <ModifyButton
                    handler={() => handleNotShown(e.id)}
                    mod="Hasn't Shown"
                  />
                </div> */}
                {list.find((el) => el.id === e.id)?.data?.hasntShown ||
                list.find((el) => el.id === e.id)?.data?.checkedIn ? (
                  <p
                    style={{
                      textAlign: "center",
                      padding: ".5rem",
                      background: "green",
                      marginTop: ".5rem",
                    }}
                  >
                    This Reservation has already been reviewed.
                  </p>
                ) : (
                  <TourB
                    handleCheckIn={handleCheckIn}
                    handleNotShown={handleNotShown}
                    e={e}
                  />
                )}

                <DeleteButton
                  deleteHandler={() =>
                    handleDelete(
                      e.id,
                      e.numberOfPassengers + e.preteens + e.children
                    )
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TourModal;
