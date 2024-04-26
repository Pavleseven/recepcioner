import React, { useContext } from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import WrapperAdmin from "../../Components/WrapperAdmin";
import TourModal from "../../Components/TourModal";
import Footer from "../../Components/Footer";
import CreateAccount from "../../Components/CreateAccount";
import { db } from "../../firebase";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import "./admin-page.scss";
import AdminHeader from "../../Components/AdminHeader";
import { applicationContext } from "../../context";

const AdminPage = () => {
  const {setList}=useContext(applicationContext)
  const [openModal, setOpenModal] = useState(false);
  const [clickedTour, setClickedTour] = useState(null);

  useEffect(() => {
    const fetchAllDocs = async () => {
      const collectionRef = collection(db, "ticketspavle");
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(docsData);
      setList(docsData)
    };

    fetchAllDocs();
  }, []);
  const handleOpen = (tour) => {
    setOpenModal(true);
    setClickedTour(tour);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="div-admin-page">
      <AdminHeader />
      <WrapperAdmin handleOpen={handleOpen} />
      {openModal && (
        <TourModal
          handleClose={handleClose}
          clickedTour={clickedTour}
          setClickedTour={setClickedTour}
        />
      )}
      <CreateAccount />
      <Footer />
    </div>
  );
};

export default AdminPage;
