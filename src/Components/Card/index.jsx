import React, { useContext, useEffect, useRef, useState } from "react";
import FormCard from "../Form";
import { applicationContext, bookingContext } from "../../context";
import CardCarousel from "../CardCarousel";
import PromoModal from "../PromoModal";
import BookModal from "../bookModal";
import { guaranteedMsg } from "../../msgs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { promoMsg } from "../../msgs";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ReceptionistModal from "../ReceptionistModal";

function CardContainer({ ride }) {
  const { allDocs, rides, setShowOverlay, receptionistModal } =
    useContext(applicationContext);
  const { setAvailableDates, setSelectedId, setSelectedRide, selectedRide } =
    useContext(bookingContext);
  const [openBooking, setOpenBooking] = useState("");
  const scrollRef = useRef(null);
  const cardRef = useRef();
  const [carousel, showCarousel] = useState(false);
  const [promoModal, setPromoModal] = useState(false);
  const [itineraryModal, setItineraryModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);
  const guaranteedModal = function () {
    setItineraryModal((prev) => !prev);
  };
  const handleBookModal = function () {
    setShowBookModal((prev) => !prev);
  };
  const handleCarousel = function () {
    showCarousel((prev) => !prev);
  };

  const handlePromo = function () {
    setPromoModal((prev) => !prev);
  };

  const handleImageClick = (selectedBoat) => {
    const dates = allDocs
      ?.filter((e) => e.data.boat === selectedBoat)
      .map((e) => ({
        id: e.id,
        date: e.data.date,
        type: e.data.type,
        availableSeats: e.data.availableSeats,
      }));

    setAvailableDates(dates);
    setSelectedId(null);
    setSelectedRide(() => rides.find((e) => selectedBoat === e.id));

    if (openBooking === "" || openBooking?.id !== selectedRide?.id) {
      setOpenBooking(() => rides.find((e) => selectedBoat === e.id));
    } else {
      setOpenBooking("");
    }
  };
  return (
    <>
      <div className="card" ref={cardRef}>
        {ride.data.itinerary ? (
          <img
            className="pointer"
            style={{ width: "80px", position: "absolute" }}
            src={`${process.env.PUBLIC_URL}/infosvg.svg`}
            alt="pointer-img"
            onClick={handleCarousel}
          />
        ) : (
          ""
        )}

        <img src={ride.data.image} alt={ride.data.name} key={ride.id} />
        <hr />
        <h2>{ride.data.name}</h2>
        <h3>
          Google rating: {ride.data.rating}{" "}
          <span style={{ color: "#F9992E" }}>
            {[...Array(Math.round(ride.data.rating))].map(() => {
              return <>&#9733;</>;
            })}
          </span>{" "}
        </h3>
        <hr />
        <div className="tour-desc">
          {ride.data.desc.map((e) => {
            return (
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/${e.img}`}
                  alt="card=img"
                />
                <p dangerouslySetInnerHTML={{ __html: e.text }}></p>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: "25px",
              width: "fit-content",

              fontFamily: "Gagalin",
              margin: "15px auto 15px auto",
            }}
            dangerouslySetInnerHTML={{ __html: ride.data.price }}
          ></div>
          {ride.data.promoCode ? (
            <img
              src={`${process.env.PUBLIC_URL}/promonew.svg`}
              alt=""
              style={{ width: "100px", cursor: "pointer" }}
              onClick={handlePromo}
            />
          ) : (
            ""
          )}
          {ride.data.beforeBooking ? (
            <img
              className="pointer refbutton"
              style={{
                width: "130px",
              }}
              src={`${process.env.PUBLIC_URL}/b4booknow.svg`}
              alt="pointer-img"
              onClick={handleBookModal}
            />
          ) : (
            ""
          )}

          {ride.data.guaranteedSeats ? (
            <img
              className="pointer refbutton"
              style={{
                width: "100px",
                marginRight: "20px",
              }}
              src={`${process.env.PUBLIC_URL}/seatsnew.svg`}
              alt="pointer-img"
              onClick={guaranteedModal}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* <img style={{width:"100%"}} src={`${process.env.PUBLIC_URL}/gallery.svg`} /> */}
        {ride.data.external ? (
          <img
            className="pointer"
            style={{
              width: "80%",
              margin: "15px auto",
              display: "block",
            }}
            src={`${process.env.PUBLIC_URL}/wa.svg`}
            alt="pointer-img"
          />
        ) : (
          <img
            className="pointer refbutton"
            onClick={() => handleImageClick(ride.id)}
            style={{
              width: ride.data.beforeBooking ? "55%" : "75%",
              margin: ride.data.beforeBooking ? "" : "15px auto",
              display: "block",
            }}
            src={`${process.env.PUBLIC_URL}/book.svg`}
            alt="pointer-img"
          />
        )}
        {/* {ride.data.beforeBooking ? (
          <img
            className="pointer refbutton"
            style={{
              width: "50%",
            }}
            src={`${process.env.PUBLIC_URL}/b4booknow.svg`}
            alt="pointer-img"
            onClick={handleBookModal}
          />
        ) : (
          ""
        )} */}
        {ride.data.beforeBooking ? (
          window.innerWidth > 700 ? (
            <>
              <img
                className="pointer refbutton"
                src={`${process.env.PUBLIC_URL}/callhere.svg`}
                alt="pointer-img"
                style={{
                  width: "35%",
                }}
                onClick={() => setPhoneDialog(true)}
              />
              <Dialog
                open={phoneDialog}
                onClose={() => setPhoneDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    style={{ textAlign: "center" }}
                  >
                    * Call this number and check availability for the tour in
                    exact day you want to make reservation * <br />
                    <span>+381693339696</span>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <a
              href="tel:+381693339696"
              style={{
                width: "40%",
              }}
            >
              <img
                className="pointer refbutton"
                src={`${process.env.PUBLIC_URL}/callhere.svg`}
                alt="pointer-img"
              />
            </a>
          )
        ) : (
          ""
        )}
      </div>
      {showBookModal ? <BookModal handleBookModal={handleBookModal} /> : ""}
      {openBooking?.id === selectedRide?.id ? (
        <FormCard
          ref={scrollRef}
          openBooking={openBooking}
          setOpenBooking={setOpenBooking}
          ride={ride}
        />
      ) : (
        ""
      )}
      {carousel && ride.data.itinerary ? (
        <CardCarousel
          handleCarousel={handleCarousel}
          itinerary={ride.data.itinerary}
        />
      ) : (
        ""
      )}
      {promoModal ? (
        <PromoModal handlePromo={handlePromo} msg={promoMsg} />
      ) : (
        ""
      )}
      {itineraryModal ? (
        <PromoModal handlePromo={guaranteedModal} msg={guaranteedMsg} />
      ) : (
        ""
      )}
    </>
  );
}

export default CardContainer;
