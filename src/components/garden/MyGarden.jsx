import "./MyGarden.css";
import { useEffect, useState } from "react";
import {
  deleteGardenBed,
  getGardenBedsByUserId,
} from "../../services/gardenService.jsx";
import { Button } from "reactstrap";
import { MyGardenBed } from "./MyGardenBed.jsx";

export const MyGarden = ({ currentUser }) => {
  const [myGardenBeds, setMyGardenBeds] = useState([]);

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

  const handleDelete = (gardenBedId) => {
    deleteGardenBed(gardenBedId).then(() => {
      getAndSetGardenBeds();
    });
  };

  useEffect(() => {
    getAndSetGardenBeds();
  }, [currentUser]);

  return (
    <>
      <section className="garden-section">
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
                <MyGardenBed
                  key={gardenBed.id}
                  currentUser={currentUser}
                  gardenBed={gardenBed}
                  onDelete={handleDelete}
                />
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
