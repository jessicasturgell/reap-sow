import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { PlantList } from "../components/plants/Plant.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { MyGarden } from "../components/garden/MyGarden.jsx";
import { GardenBedForm } from "../components/forms/CreateGardenBed.jsx";
import { PlantNewCropForm } from "../components/forms/PlantNewCrop.jsx";
import { EditGardenBed } from "../components/forms/EditGardenBed.jsx";
import { EditPlantedCrop } from "../components/forms/EditPlantedCrop.jsx";
import { CareHistory } from "../components/history/CareHistory.jsx";
import { CareHistoryExpand } from "../components/history/CareHistoryExpand.jsx";
import { HarvestReport } from "../components/harvest/HarvestReport.jsx";
import { CreateNewHarvestForm } from "../components/forms/CreateNewHarvestForm.jsx";
import { EditHarvestForm } from "../components/forms/EditHarvestForm.jsx";
import { MyCalendar } from "../components/calendar/Calendar.jsx";

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
        <Route path="/garden">
          <Route index element={<MyGarden currentUser={currentUser} />} />
          <Route
            path="create"
            element={<GardenBedForm currentUser={currentUser} />}
          />
          <Route
            path="plant/:gardenBedId"
            element={<PlantNewCropForm currentUser={currentUser} />}
          />
          <Route
            path="plant/edit/:gardenPlotId"
            element={<EditPlantedCrop currentUser={currentUser} />}
          />
          <Route
            path="edit/:gardenBedId"
            element={<EditGardenBed currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="plants"
          element={<PlantList currentUser={currentUser} />}
        />
        <Route path="history">
          <Route index element={<CareHistory currentUser={currentUser} />} />
          <Route
            path=":checklistId"
            element={<CareHistoryExpand currentUser={currentUser} />}
          />
        </Route>
        <Route path="harvest">
          <Route index element={<HarvestReport currentUser={currentUser} />} />
          <Route
            path="create"
            element={<CreateNewHarvestForm currentUser={currentUser} />}
          />
          <Route
            path="edit/:harvestId"
            element={<EditHarvestForm currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="calendar"
          element={<MyCalendar currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
