import "./CareHistory.css";
import React, { useEffect, useState } from "react";
import { getChecklistsById } from "../../services/checklistService.jsx";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { getAllGardenBeds } from "../../services/gardenService.jsx";

export const CareHistoryExpand = ({ currentUser }) => {
  const [checklist, setChecklist] = useState({});
  const [gardenBeds, setGardenBeds] = useState([]);
  const { checklistId } = useParams();

  useEffect(() => {
    getChecklistsById(checklistId).then((data) => {
      setChecklist(data);
    });
  }, [checklistId]);

  const getAndSetGardenBeds = () => {
    getAllGardenBeds()
      .then((gardenBedsArray) => {
        setGardenBeds(gardenBedsArray);
      })
      .catch((error) => {
        console.error("Error fetching garden beds:", error);
      });
  };

  useEffect(() => {
    getAndSetGardenBeds();
  }, [currentUser]);

  const findGardenBedName = (id) => {
    const gardenBed = gardenBeds.find((bed) => bed.id === id);
    return gardenBed ? gardenBed.name : id;
  };

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? "Invalid date"
      : date.toISOString().split("T")[0];
  };

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Care History</h2>
        <p className="text-block">View your care history here!</p>
      </div>
      <section className="care-history">
        <ListGroup className="m-3">
          <ListGroupItem color="success">
            {getFormattedDate(checklist?.timestamp)}
          </ListGroupItem>
          <ListGroupItem color="info">
            {" "}
            {findGardenBedName(checklist?.gardenBedId)}
          </ListGroupItem>
          <ListGroupItem color="warning">
            {checklist?.isWatered ? "Watered!" : "Did not water :("}
          </ListGroupItem>
          <ListGroupItem color="warning">
            {checklist?.checkedHealth
              ? "Checked health!"
              : "Did not check health :("}
          </ListGroupItem>
          <ListGroupItem color="warning">
            {checklist?.checkedPests
              ? "Checked for pests!"
              : "Did not check for pests :("}
          </ListGroupItem>
          <ListGroupItem color="danger">
            {checklist?.notes !== "" ? checklist?.notes : "No notes!"}
          </ListGroupItem>
        </ListGroup>
      </section>
    </section>
  );
};
