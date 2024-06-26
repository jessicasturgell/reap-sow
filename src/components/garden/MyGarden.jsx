import "./MyGarden.css";
import { useEffect, useState } from "react";
import {
  deleteGardenBed,
  getGardenBedsByUserId,
} from "../../services/gardenService.jsx";
import {
  deleteCrop,
  getPlantsByGardenPlot,
} from "../../services/plantService.jsx";
import { Button } from "reactstrap";
import { Checklist } from "../checklist/Checklist.jsx";
import { MyGardenPlant } from "./MyGardenPlant.jsx";
import { MyGardenBed } from "./MyGardenBed.jsx";

export const MyGarden = ({ currentUser }) => {
  const [myGardenBeds, setMyGardenBeds] = useState([]);
  const [myPlants, setMyPlants] = useState([]);
  const [gardenPlot, setMyGardenPlots] = useState([]);

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

  // const getAndSetPlants = () => {
  //   if (currentUser?.id) {
  //     getPlantsByGardenPlot(currentUser.id)
  //       .then((myPlantsArray) => {
  //         setMyPlants(myPlantsArray);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching my plants:", error);
  //       });
  //   }
  // };

  useEffect(() => {
    getAndSetGardenBeds(); // Fetches garden beds
    // getAndSetPlants(); // Fetches plants by garden plot
  }, [currentUser]); // Triggers effect whenever currentUser changes

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
              return (
                <MyGardenBed key={gardenBed.id} currentUser={currentUser} gardenBed={gardenBed} />
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
      <section className="footer">
        <div className="footer-flex">
          <a href="https://www.flaticon.com/free-icons/corn" title="corn icons">
            Corn icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/onion"
            title="onion icons"
          >
            Onion icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/vegetable"
            title="vegetable icons"
          >
            Vegetable icons created by SA Family - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/food-and-restaurant"
            title="food and restaurant icons"
          >
            Food and restaurant icons created by SA Family - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/fruit"
            title="fruit icons"
          >
            Fruit icons created by SA Family - Flaticon
          </a>
        </div>
      </section>
    </>
  );
};
