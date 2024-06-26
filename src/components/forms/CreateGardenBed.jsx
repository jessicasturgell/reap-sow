import { useState } from "react";
import "./Form.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createNewGardenBed } from "../../services/gardenService.jsx";

export const GardenBedForm = ({ currentUser }) => {
  const [gardenBed, setGardenBed] = useState({ name: "" });

  const handleSave = (event) => {
    event.preventDefault();
    if (gardenBed.name.length > 0) {
      const newGardenBed = {
        userId: currentUser.id,
        name: gardenBed.name,
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
      window.alert("Please input a name!");
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
          <Button color="success" onClick={handleSave}>
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};
