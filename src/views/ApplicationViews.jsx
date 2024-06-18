import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { PlantList } from "../components/plants/Plant.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localReapUser = localStorage.getItem("reap_user");
    const reapUserObject = JSON.parse(localReapUser);

    setCurrentUser(reapUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="/plants" element={<PlantList />} />
      </Route>
    </Routes>
  );
};
