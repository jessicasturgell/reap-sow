import "./MyGarden.css";
import { Button } from "reactstrap";
import {
  deleteGardenBed,
  getGardenBedsByUserId,
} from "../../services/gardenService.jsx";
import { MyGardenPlant } from "./MyGardenPlant.jsx";
import { Checklist } from "../checklist/Checklist.jsx";
import { getPlantsByGardenPlot } from "../../services/plantService.jsx";
import { useEffect, useState } from "react";

export const MyGardenBed = ({ currentUser, gardenBed }) => {
  const [myGardenBeds, setMyGardenBeds] = useState([]);
  const [myPlants, setMyPlants] = useState([]);
  const handleDelete = (gardenBed) => {
    deleteGardenBed(gardenBed.id).then(() => {
      getAndSetGardenBeds();
    });
  };

  const getAndSetGardenBeds = () => {
    if (currentUser?.id) {
      getGardenBedsByUserId(currentUser.id)
        .then((gardenBedsArray) => {
          setMyGardenBeds(gardenBedsArray);
        })
        .catch((error) => {
          console.error("Error fetching garden beds:", error);
        });
    }
  };

  const getAndSetPlants = () => {
    if (currentUser?.id) {
      getPlantsByGardenPlot(currentUser.id)
        .then((myPlantsArray) => {
          const plantsInThisBed = myPlantsArray.filter(
            (plant) => plant.gardenBedId === gardenBed.id
          );
          setMyPlants(plantsInThisBed);
        })
        .catch((error) => {
          console.error("Error fetching my plants:", error);
        });
    }
  };

  useEffect(() => {
    getAndSetGardenBeds(); // Fetches garden beds
    getAndSetPlants(); // Fetches plants by garden plot
  }, [currentUser]); // Triggers effect whenever currentUser changes

  return (
    <>
      <div key={gardenBed.id} className="garden-bed-flex-container">
        <div className="garden-bed-container">
          <div className="garden-bed-info">
            <p>{gardenBed.name}</p>
            <div className="garden-plots-container">
              {myPlants.map((plant) => {
                return (
                  <MyGardenPlant
                    key={plant.id}
                    plant={plant}
                    getAndSetPlants={getAndSetPlants}
                  />
                );
              })}
            </div>
          </div>
          <div className="garden-plot-btn-container">
            <Button
              color="success"
              className="mt-2 garden-plot-btn"
              onClick={() => {
                window.open(
                  `/garden/plant/${gardenBed.id}`,
                  "newwindow",
                  "width=600,height=400"
                );
              }}
            >
              Add Plant
            </Button>
          </div>
        </div>
        <Checklist currentUser={currentUser} gardenBedId={gardenBed.id} />
        <Button
          color="warning"
          onClick={() => {
            window.open(
              `/garden/edit/${gardenBed.id}`,
              "newwindow",
              "width=600,height=400"
            );
          }}
        >
          Edit Bed
        </Button>
        <Button
          className="ms-1"
          color="danger"
          onClick={() => handleDelete(gardenBed)}
        >
          Delete Bed
        </Button>
      </div>
    </>
  );
};
