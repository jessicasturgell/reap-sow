import { useState } from "react";
import "./Form.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createNewGardenBed } from "../../services/gardenService.jsx";

export const GardenBedForm = ({ currentUser }) => {
  const [gardenBed, setGardenBed] = useState({ name: "", length: 0, width: 0 });

  const handleSave = (event) => {
    event.preventDefault();
    if (gardenBed.name && gardenBed.length > 0 && gardenBed.width > 0) {
      const newGardenBed = {
        userId: currentUser.id,
        name: gardenBed.name,
        length: gardenBed.length,
        width: gardenBed.width,
      };

      createNewGardenBed(newGardenBed).then(() => {
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
  return (
    <>
      <section className="form-container">
        <Form>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter the name of your new garden bed here"
              type="text"
              onChange={(event) => {
                const gardenBedCopy = { ...gardenBed };
                gardenBedCopy.name = event.target.value;
                setGardenBed(gardenBedCopy);
              }}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="x" sm={2}>
              Length
            </Label>
            <Input
              id="x"
              name="x"
              placeholder="Enter the length (x-axis) of your garden bed here"
              type="number"
              onChange={(event) => {
                const gardenBedCopy = { ...gardenBed };
                gardenBedCopy.length = parseInt(event.target.value);
                setGardenBed(gardenBedCopy);
              }}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="y" sm={2}>
              Width
            </Label>
            <Input
              id="y"
              name="y"
              placeholder="Enter the width (y-axis) of your garden bed here"
              type="number"
              onChange={(event) => {
                const gardenBedCopy = { ...gardenBed };
                gardenBedCopy.width = parseInt(event.target.value);
                setGardenBed(gardenBedCopy);
              }}
            />
          </FormGroup>
          <Button color="success" onClick={handleSave}>
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};
