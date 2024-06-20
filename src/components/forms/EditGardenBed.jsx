import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getGardenBedsById,
  updateGardenBed,
} from "../../services/gardenService.jsx";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const EditGardenBed = ({ currentUser }) => {
  const [gardenBed, setGardenBed] = useState({});
  const { gardenBedId } = useParams();

  useEffect(() => {
    getGardenBedsById(gardenBedId).then((data) => {
      setGardenBed(data);
    });
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault();

    const editedGardenBed = {
      id: gardenBedId,
      name: gardenBed.name,
      length: gardenBed.length,
      width: gardenBed.width,
      userId: gardenBed.userId,
    };

    updateGardenBed(editedGardenBed).then(() => {
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
            <Label for="name" sm={2}>
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={gardenBed?.name ? gardenBed?.name : ""}
              type="text"
              onChange={(event) => {
                const gardenBedCopy = { ...gardenBed };
                gardenBedCopy.name = event.target.value;
                setGardenBed(gardenBedCopy);
              }}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="x" sm={2}>
              Length
            </Label>
            <Input
              id="x"
              name="x"
              value={gardenBed?.length ? gardenBed?.length : 0}
              type="number"
              onChange={(event) => {
                const gardenBedCopy = { ...gardenBed };
                gardenBedCopy.length = parseInt(event.target.value);
                setGardenBed(gardenBedCopy);
              }}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="y" sm={2}>
              Width
            </Label>
            <Input
              id="y"
              name="y"
              value={gardenBed?.width ? gardenBed?.width : 0}
              type="number"
              onChange={(event) => {
                const gardenBedCopy = { ...gardenBed };
                gardenBedCopy.width = parseInt(event.target.value);
                setGardenBed(gardenBedCopy);
              }}
              required
            />
          </FormGroup>
          <Button color="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Form>
      </section>
    </>
  );
};
