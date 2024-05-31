import { React, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApplicationProvider } from "./context";
import { db } from "./firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import LoginPage from "./Pages/LoginPage";
import NoInternetConnection from "./Components/NoInternet";
import ReservationPage from "./Pages/ReservationPage";
import AdminPage from "./Pages/AdminPage";
import "./app.scss";
import ProfilePage from "./Pages/ProfilePage";
import Overlay from "./Components/Overlay";
import Loader from "./Components/Loader";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import DashboardPage from "./Pages/DashboardPage";
import ReceptionistModal from "./Components/ReceptionistModal";
import TimeTablePage from "./Pages/TimeTablePage";
import { ridez } from "./rides";
const App = () => {
  const theme = createTheme({
    palette: {
      success: {
        main: "#003566",
      },
      error: {
        light: "#9C294B",
        main: "#9C294B",
        dark: "#9C294B",
      },
      green: {
        main: "#00e676",
      },
    },
  });
  const [freshData, setFreshData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );
  const [dashboard, setDashboard] = useState(
    JSON.parse(localStorage.getItem("dashboard"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [allDocs, setAllDocs] = useState([]);
  const [rides, setAllRides] = useState([]);
  const [uid, setUid] = useState(JSON.parse(localStorage.getItem("uid")));
  // const [showOverlay, setShowOverlay] = useState(false);
  const [reservation, setReservation] = useState([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [receptionistModal, setReceptionistModal] = useState(false);
  useEffect(() => {
    const fetchAllDocs = async () => {
      const collectionRef = collection(db, "tours2024");
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllDocs(docsData);
    };
    fetchAllDocs();
  }, [freshData]);

  useEffect(() => {
    const fetchAllRides = async () => {
      const collectionRef = collection(db, "rides");
      const querySnapshot = await getDocs(collectionRef);
      const ridesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(JSON.stringify(ridesData))
      setAllRides(ridesData);
    };

    fetchAllRides();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

    // useEffect(() => {
    //   ridez.forEach((e)=> {
    //     const docRef = doc(db, "rides", e.id);
    //     setDoc(docRef,e.data)
    //   })
    // }, []);

  const logOut = () => {
    setAccessToken("");
    localStorage.removeItem("uid");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("dashboard");
    localStorage.removeItem("userData");
    setIsAdmin(false);
    setDashboard(false);
    setUser("");
  };

  if (isLoading) {
    return <Loader height={"100vh"} />;
  }

  return (
    <div className="div-app">
      <NoInternetConnection>
        <ApplicationProvider
          value={{
            setAccessToken,
            setIsAdmin,
            logOut,
            allDocs,
            user,
            setUser,
            userData,
            setUserData,
            setFreshData,
            freshData,
            rides,
            setUid,
            uid,
            reservation,
            setReservation,
            totalCoins,
            setTotalCoins,
            setDashboard,
            setList,
            list,
            receptionistModal,
            setReceptionistModal,
          }}
        >
          <ThemeProvider theme={theme}>
            {accessToken ? (
              isAdmin ? (
                <Routes>
                  <Route exact path="/admin_page" element={<AdminPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="/admin_page" replace />}
                  />
                </Routes>
              ) : dashboard ? (
                <Routes>
                  <Route
                    exact
                    path="/dashboardpage"
                    element={<DashboardPage />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboardpage" replace />}
                  ></Route>
                </Routes>
              ) : (
                <Routes>
                  <Route
                    path="/reservation"
                    element={<ReservationPage />}
                  ></Route>
                  <Route
                    path="/time-table"
                    element={<TimeTablePage />}
                  ></Route>
                  <Route
                    path="*"
                    element={<Navigate to="/reservation" replace />}
                  />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              )
            ) : (
              <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </ThemeProvider>
          {receptionistModal ? <ReceptionistModal /> : ""}
        </ApplicationProvider>
      </NoInternetConnection>
      {/* {showOverlay ? <Overlay /> : ""} */}
    </div>
  );
};

export default App;
