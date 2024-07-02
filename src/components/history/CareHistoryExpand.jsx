import "./CareHistory.css";
import React, { useEffect, useState } from "react";
import { getChecklistsById } from "../../services/checklistService.jsx";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";

export const CareHistoryExpand = () => {
  const [checklist, setChecklist] = useState({});
  const { checklistId } = useParams();

  useEffect(() => {
    if (currentUser?.id) {
      getChecklistsById(checklistId).then((data) => {
        const checklistObj = data[0];
        setChecklist(checklistObj);
      });
    }
  }, [checklistId]);

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Care History</h2>
        <p className="text-block">View your care history here!</p>
      </div>
      <section className="care-history">
        <ListGroup className="m-3">
          <ListGroupItem color="success">
            {new Date(checklist.timestamp).toISOString().split("T")[0]}
          </ListGroupItem>
          <ListGroupItem color="info">To Do</ListGroupItem>
          <ListGroupItem color="warning">
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
        </ListGroup>
      </section>
    </section>
  );
};
