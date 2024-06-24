import "./MyGarden.css";
import { useEffect, useState } from "react";
import {
  deleteGardenBed,
  getGardenBedsByUserId,
} from "../../services/gardenService.jsx";
import { getPlantsByGardenPlot } from "../../services/plantService.jsx";
import { Button } from "reactstrap";
import { Checklist } from "../checklist/Checklist.jsx";

export const MyGarden = ({ currentUser }) => {
  const [myGardenBeds, setMyGardenBeds] = useState([]);
  const [myPlants, setMyPlants] = useState([]);

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
          setMyPlants(myPlantsArray);
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

  const handleDelete = (gardenBed) => {
    deleteGardenBed(gardenBed.id).then(() => {
      getAndSetGardenBeds();
    });
  };

  return (
    <>
      {/* Populates a list of Garden Beds owned by the current user. */}
      <section>
        <div className="header-container">
          <h2 className="h-2">My Garden</h2>
          <p className="text-block">
            View and manage your garden beds and planted crops here!
          </p>
        </div>
        <div className="my-garden-container">
          <section className="my-garden">
            {myGardenBeds.map((gardenBed) => {
              // Filters plants for current garden bed
              const plantsInThisBed = myPlants.filter(
                (plant) => plant.gardenBedId === gardenBed.id
              );

              return (
                <div key={gardenBed.id} className="garden-bed-flex-container">
                  <div className="garden-bed-container">
                    <div className="garden-bed-info">
                      <p>{gardenBed.name}</p>
                      <div className="garden-plots-container">
                        {plantsInThisBed.map((plant) => {
                          if (plant.newRow) {
                            return (
                              <>
                                <div class="break"></div>
                                <div className="garden-plot" key={plant.id}>
                                  {plant.plant.name}
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <div className="garden-plot" key={plant.id}>
                                {plant.plant.name}
                              </div>
                            );
                          }
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
                  <Checklist
                    currentUser={currentUser}
                    gardenBedId={gardenBed.id}
                  />
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
              );
            })}
          </section>
          <Button
            className="garden-btn"
            color="success"
            onClick={() => {
              window.open(
                "/garden/create",
                "newwindow",
                "width=600,height=400"
              );
            }}
          >
            Create New Garden Bed
          </Button>
        </div>
      </section>
    </>
  );
};
