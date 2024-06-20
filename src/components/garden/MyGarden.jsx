import "./MyGarden.css";
import { useEffect, useState } from "react";
import { getGardenBedsByUserId } from "../../services/gardenService.jsx";
import { getPlantsByGardenPlot } from "../../services/plantService.jsx";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const MyGarden = ({ currentUser }) => {
  const [myGardenBeds, setMyGardenBeds] = useState([]);
  const [myPlants, setMyPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      getGardenBedsByUserId(currentUser.id)
        .then((gardenBedsArray) => {
          setMyGardenBeds(gardenBedsArray);
        })
        .catch((error) => {
          console.error("Error fetching garden beds:", error);
        });
    }
  }, [currentUser]); // Trigger effect whenever currentUser changes

  useEffect(() => {
    if (currentUser?.id) {
      getPlantsByGardenPlot(currentUser.id)
        .then((myPlantsArray) => {
          setMyPlants(myPlantsArray);
        })
        .catch((error) => {
          console.error("Error fetching plants:", error);
        });
    }
  }, [currentUser]); // Trigger effect whenever currentUser changes

  return (
    <>
      {/* Populate a list of Garden Beds owned by the current user. */}
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
              // Filter plants for current garden bed
              const plantsInThisBed = myPlants.filter(
                (plant) => plant.gardenBedId === gardenBed.id
              );

              return (
                <div key={gardenBed.id} className="garden-bed-flex-container">
                  <div className="garden-bed-container">
                    <div
                      className="garden-bed"
                      style={{
                        gridTemplateColumns: `repeat(${gardenBed.length}, 1fr)`,
                        gridTemplateRows: `repeat(${gardenBed.width}, 1fr)`,
                      }}
                    >
                      {Array.from({
                        length: gardenBed.length * gardenBed.width,
                      }).map((_, idx) => (
                        <div key={idx} className="grid-square"></div>
                      ))}
                    </div>
                    <div className="garden-bed-info">
                      <p>{gardenBed.name}</p>
                      {plantsInThisBed.map((plantEntry) => (
                        <div key={plantEntry.id}>
                          {plantEntry.plant.name}: ( {plantEntry.x} ,{" "}
                          {plantEntry.y} )
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="checkbox-info">
                    <Form>
                      <FormGroup check>
                        <Input type="checkbox" />
                        <Label check>Watered</Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" />
                        <Label check>Checked Health</Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" />
                        <Label check>Checked for Pests</Label>
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <Label className="m-0" for="exampleText">
                          Notes
                        </Label>
                        <Input id="exampleText" name="text" type="textarea" />
                      </FormGroup>
                      <Button color="success">Save</Button>
                    </Form>
                  </div>
                </div>
              );
            })}
          </section>
          <Button
            className="garden-btn"
            color="success"
            onClick={() => {
              navigate("/garden/create");
            }}
          >
            Create New Garden Bed
          </Button>
        </div>
      </section>
    </>
  );
};
