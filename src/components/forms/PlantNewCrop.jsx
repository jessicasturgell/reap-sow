import { useEffect, useState } from "react";
import "./Form.css";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { getAllPlants, plantNewCrop } from "../../services/plantService.jsx";
import { useParams } from "react-router-dom";

export const PlantNewCropForm = ({ currentUser }) => {
  const [gardenPlot, setGardenPlot] = useState({
    userId: 0,
    plantId: 0,
    gardenBedId: 0,
    newRow: false,
  });
  const [myPlants, setMyPlants] = useState([]);

  let { gardenBedId } = useParams();

  useEffect(() => {
    getAllPlants()
      .then((data) => setMyPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    if (gardenPlot.plantId > 0) {
      const newGardenPlot = {
        userId: currentUser.id,
        plantId: parseInt(gardenPlot.plantId),
        gardenBedId: parseInt(gardenBedId),
        newRow: gardenPlot.newRow,
      };

      console.log(newGardenPlot);
      plantNewCrop(newGardenPlot).then(() => {
        if (window.opener) {
          window.opener.location.reload();
          window.close();
        } else {
          window.alert("Parent window not found!");
        }
      });
    } else {
      window.alert("Please fill out all fields!");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGardenPlot((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              onChange={handleInputChange}
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
          <Button color="success" className="mt-2" onClick={handleSave}>
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};
