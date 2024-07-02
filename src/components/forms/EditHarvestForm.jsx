import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useEffect, useState } from "react";
import {
  getHarvestReportsById,
  updateHarvestReport,
} from "../../services/harvestService.jsx";

export const EditHarvestForm = ({ currentUser }) => {
  const [harvestReport, setHarvestReport] = useState({
    name: "",
    gardenBedName: "",
    datePlanted: "",
    dateHarvested: "",
    weight: "",
    notes: "",
  });
  const { harvestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getHarvestReportsById(harvestId).then((data) => {
      setHarvestReport(data);
    });
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault();

    const editedHarvestReport = {
      id: harvestId,
      name: harvestReport.name,
      userId: harvestReport.userId,
      datePlanted: harvestReport.datePlanted,
      dateHarvested: harvestReport.dateHarvested,
      weight: harvestReport.weight,
      notes: harvestReport.notes,
    };

    updateHarvestReport(editedHarvestReport).then(() => {
      navigate("/harvest");
    });
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
          <Label for="weight">Weight</Label>
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
