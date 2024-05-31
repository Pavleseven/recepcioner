import React, { useContext } from "react";
import Footer from "../../Components/Footer";
import AdminHeader from "../../Components/AdminHeader";
import DashboardList from "../../Components/DashboardList";
import { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

import { applicationContext } from "../../context";
import DashAdmin from "../../Components/DashAdmin";
function DashboardPage() {
  const { setList } = useContext(applicationContext);
  useEffect(() => {
    const fetchAllDocs = async () => {
      const collectionRef = collection(db, "tickets2024");
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setList(docsData);
    };

    fetchAllDocs();
  }, []);
  return (
    <div>
      <DashAdmin />
      <DashboardList />
      <Footer />
    </div>
  );
}

export default DashboardPage;
