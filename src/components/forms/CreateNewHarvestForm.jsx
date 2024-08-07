import { useNavigate } from "react-router-dom";
import { createNewHarvestReport } from "../../services/harvestService.jsx";
import "./Form.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";

export const CreateNewHarvestForm = ({ currentUser }) => {
  const navigate = useNavigate();
  const [harvestReport, setHarvestReport] = useState({
    name: "",
    gardenBedName: "",
    userId: 0,
    datePlanted: "",
    dateHarvested: "",
    weight: 0,
    notes: "",
  });

  const handleSave = (event) => {
    event.preventDefault();
    if (harvestReport.name.length > 0) {
      const newHarvestReport = {
        userId: currentUser.id,
        name: harvestReport.name,
        gardenBedName: harvestReport.gardenBedName,
        datePlanted: harvestReport.datePlanted,
        dateHarvested: harvestReport.dateHarvested,
        weight: harvestReport.weight,
        notes: harvestReport.notes,
      };

      createNewHarvestReport(newHarvestReport).then(() => {
        navigate("/harvest");
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHarvestReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  return (
    <section className="harvest-form">
      <Form className="m-3" onSubmit={handleSave}>
        <FormGroup>
          <Label for="name">Plant Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Name of harvested plant"
            type="text"
            value={harvestReport.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gardenBedName">Garden Bed Name</Label>
          <Input
            id="gardenBedName"
            name="gardenBedName"
            type="text"
            placeholder="Name of garden bed"
            value={harvestReport.gardenBedName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="datePlanted">Date Planted</Label>
          <Input
            id="datePlanted"
            name="datePlanted"
            type="date"
            value={harvestReport.datePlanted}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dateHarvested">Date Harvested</Label>
          <Input
            id="dateHarvested"
            name="dateHarvested"
            type="date"
            value={harvestReport.dateHarvested}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="weight">Weight in Pounds</Label>
          <Input
            id="weight"
            name="weight"
            placeholder="Weight in grams"
            type="number"
            step="0.01"
            value={harvestReport.weight}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input
            id="notes"
            name="notes"
            type="textarea"
            value={harvestReport.notes}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="success" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};
