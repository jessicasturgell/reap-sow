import "./Checklist.css";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addNewChecklistData } from "../../services/checklistService.jsx";
import { addNewDate } from "../../services/calendarService.jsx";

export const Checklist = ({ currentUser, gardenBedId }) => {
  const [checklist, setChecklist] = useState({
    isWatered: false,
    checkedHealth: false,
    checkedPests: false,
    notes: "",
    timestamp: new Date(),
  });

  const getCurrentDateString = () => {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  };

  useEffect(() => {
    const savedChecklistData = JSON.parse(
      localStorage.getItem(`checklist-${gardenBedId}`)
    );
    if (savedChecklistData) {
      const savedDate = savedChecklistData.date;
      const currentDate = getCurrentDateString();
      if (savedDate === currentDate) {
        setChecklist(savedChecklistData.checklist);
      } else {
        localStorage.removeItem(`checklist-${gardenBedId}`);
      }
    }
  }, [gardenBedId]);

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === "checkbox" ? checked : event.target.value;
    setChecklist({
      ...checklist,
      [name]: value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const newChecklistData = {
      userId: currentUser.id,
      gardenBedId: gardenBedId,
      isWatered: checklist.isWatered,
      checkedHealth: checklist.checkedHealth,
      checkedPests: checklist.checkedPests,
      notes: checklist.notes,
      timestamp: new Date().toISOString(),
    };
    const dataToSave = {
      date: getCurrentDateString(),
      checklist: newChecklistData,
    };
    localStorage.setItem(
      `checklist-${gardenBedId}`,
      JSON.stringify(dataToSave)
    );
    addNewChecklistData(newChecklistData).then((parsedId) => {
      if (parsedId) {
        const newDateData = {
          userId: currentUser.id,
          startDate: newChecklistData.timestamp,
          endDate: newChecklistData.timestamp,
          description: `Checklist Completed`,
          checklistId: parsedId,
        };

        addNewDate(newDateData).then(() => {
          window.alert("Saved!");
        });
      }
    });
  };

  return (
    <div className="checkbox-info">
      <Form onSubmit={handleSave}>
        <FormGroup check>
          <Input
            type="checkbox"
            name="isWatered"
            checked={checklist.isWatered}
            onChange={handleChange}
          />
          <Label check>Watered</Label>
        </FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            name="checkedHealth"
            checked={checklist.checkedHealth}
            onChange={handleChange}
          />
          <Label check>Checked Health</Label>
        </FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            name="checkedPests"
            checked={checklist.checkedPests}
            onChange={handleChange}
          />
          <Label check>Checked for Pests</Label>
        </FormGroup>
        <FormGroup className="mt-2">
          <Label className="m-0" for="notes">
            Notes
          </Label>
          <Input
            id="notes"
            name="notes"
            type="textarea"
            value={checklist.notes}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="success" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};
