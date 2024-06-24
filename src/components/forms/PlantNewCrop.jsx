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
    x: 0,
    y: 0,
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
    if (gardenPlot.plantId > 0 && gardenPlot.x > 0 && gardenPlot.y > 0) {
      const newGardenPlot = {
        userId: currentUser.id,
        plantId: parseInt(gardenPlot.plantId),
        gardenBedId: parseInt(gardenBedId),
        x: parseInt(gardenPlot.x),
        y: parseInt(gardenPlot.y),
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
            {" "}
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
          <FormGroup>
            <Label for="name" sm={2}>
              X-Axis
            </Label>
            <Input
              type="number"
              name="x"
              id="x"
              value={gardenPlot.x}
              onChange={(event) => {
                const gardenPlotCopy = { ...gardenPlot };
                gardenPlotCopy.x = event.target.value;
                setGardenPlot(gardenPlotCopy);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="name" sm={2}>
              Y-Axis
            </Label>
            <Input
              type="number"
              name="y"
              id="y"
              value={gardenPlot.y}
              onChange={(event) => {
                const gardenPlotCopy = { ...gardenPlot };
                gardenPlotCopy.y = event.target.value;
                setGardenPlot(gardenPlotCopy);
              }}
            ></Input>
          </FormGroup>
          <Button color="success" onClick={handleSave}>
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};
