import "./CareHistory.css";
import React, { useEffect, useState } from "react";
import {
  deleteChecklist,
  getAllChecklists,
} from "../../services/checklistService.jsx";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { getAllGardenBeds } from "../../services/gardenService.jsx";

export const CareHistory = () => {
  const [allChecklists, setAllChecklists] = useState([]);
  const [gardenBeds, setGardenBeds] = useState([]);

  useEffect(() => {
    getAllChecklists().then((checklistArray) => {
      setAllChecklists(checklistArray);
    });

    getAllGardenBeds().then((gardenBedArray) => {
      setGardenBeds(gardenBedArray);
    });
  }, []);

  const findGardenBedName = (id) => {
    const gardenBed = gardenBeds.find((bed) => bed.id === id);
    return gardenBed ? gardenBed.name : id;
  };

  const handleDelete = (checklist) => {
    deleteChecklist(checklist.id).then(() => {
      getAllChecklists().then((checklistArray) => {
        setAllChecklists(checklistArray);
      });
    });
  };

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Care History</h2>
        <p className="text-block">View your care history here!</p>
      </div>
      <section className="care-history">
        {allChecklists.map((checklist) => (
          <>
            <ListGroup className="m-3" key={checklist.id}>
              <ListGroupItem color="success">
                {" "}
                {new Date(checklist.timestamp).toISOString().split("T")[0]}
              </ListGroupItem>
              <ListGroupItem color="info">
                {findGardenBedName(checklist.gardenBedId)}
              </ListGroupItem>
              <ListGroupItem color="warning">
                {" "}
                {checklist.isWatered ? "Watered!" : "Did not water :("}
              </ListGroupItem>
              <ListGroupItem color="warning">
                {checklist.checkedHealth
                  ? "Checked health!"
                  : "Did not check health :("}
              </ListGroupItem>
              <ListGroupItem color="warning">
                {checklist.checkedPests
                  ? "Checked for pests!"
                  : "Did not check for pests :("}
              </ListGroupItem>
              <ListGroupItem color="danger">
                {checklist.notes !== "" ? checklist.notes : "No notes!"}
              </ListGroupItem>
              <ListGroupItem color="success" className="care-btn-container">
                <Button
                  className="m-1"
                  color="danger"
                  onClick={() => handleDelete(checklist)}
                >
                  Delete Data
                </Button>
              </ListGroupItem>
            </ListGroup>
          </>
        ))}
      </section>
    </section>
  );
};
