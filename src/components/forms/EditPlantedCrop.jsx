import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateGardenBed } from "../../services/gardenService.jsx";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  editPlantedCrop,
  getPlantsByGardenPlot,
  getAllPlants,
  getGardenPlotById,
} from "../../services/plantService.jsx";

export const EditPlantedCrop = ({ currentUser, plants }) => {
  const [gardenPlot, setGardenPlot] = useState({});
  const [myPlants, setMyPlants] = useState([]);
  const { gardenPlotId } = useParams();

  useEffect(() => {
    getAllPlants()
      .then((data) => setMyPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, [currentUser]);

  useEffect(() => {
    getGardenPlotById(gardenPlotId).then((data) => {
      setGardenPlot(data[0]);
    });
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault();

    const editedGardenPlot = {
      userId: gardenPlot.userId,
      plantId: gardenPlot.plantId,
      gardenBedId: gardenPlot.gardenBedId,
      id: gardenPlotId,
      newRow: gardenPlot.newRow,
    };

    editPlantedCrop(editedGardenPlot).then(() => {
      if (window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        window.alert("Parent window not found!");
      }
    });
  };

  return (
    <>
      <section className="form-container">
        <Form>
          <FormGroup row>
            <Label for="plant" sm={2}>
              Plant
            </Label>
            <Input
              type="select"
              name="plantId"
              id="plant"
              value={gardenPlot.plantId}
              onChange={(event) => {
                const gardenPlotCopy = { ...gardenPlot };
                gardenPlotCopy.plantId = event.target.value;
                setGardenPlot(gardenPlotCopy);
              }}
            >
              <option value="">Select a plant</option>
              {myPlants.map((plant) => (
                <option key={plant.id} value={plant.id}>
                  {plant.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup check>
            <Input
              id="newRow"
              type="checkbox"
              value={gardenPlot.newRow}
              onChange={(event) => {
                const gardenPlotCopy = { ...gardenPlot };
                gardenPlotCopy.newRow = event.target.checked;
                setGardenPlot(gardenPlotCopy);
              }}
            />
            <Label check>New Row</Label>
          </FormGroup>
          <Button color="success" onClick={handleSave}>
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};
