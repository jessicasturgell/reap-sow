import "./CareHistory.css";
import React, { useEffect, useState } from "react";
import {
  deleteChecklist,
  getChecklistsByUserId,
} from "../../services/checklistService.jsx";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { getAllGardenBeds } from "../../services/gardenService.jsx";
import { CareHistoryFilterBar } from "./CareHistoryFilterBar.jsx";
import { useNavigate } from "react-router-dom";

export const CareHistory = ({ currentUser }) => {
  const [allChecklists, setAllChecklists] = useState([]);
  const [gardenBeds, setGardenBeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChecklists, setFilteredChecklist] = useState([]);
  const navigate = useNavigate();

  const getAndSetCareHistory = () => {
    if (currentUser?.id) {
      getChecklistsByUserId(currentUser.id)
        .then((checklistArray) => {
          setAllChecklists(checklistArray);
        })
        .catch((error) => {
          console.error("Error fetching care history:", error);
        });
    }
  };

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
    getAndSetCareHistory();
    getAndSetGardenBeds();
  }, [currentUser]);

  useEffect(() => {
    const foundChecklist = allChecklists.filter((checklist) =>
      checklist.timestamp.includes(searchTerm)
    );
    setFilteredChecklist(foundChecklist);
  }, [searchTerm, allChecklists]);

  const findGardenBedName = (id) => {
    const gardenBed = gardenBeds.find((bed) => bed.id === id);
    return gardenBed ? gardenBed.name : id;
  };

  const handleDelete = (checklist) => {
    deleteChecklist(checklist.id)
      .then(() => {
        return getChecklistsByUserId(currentUser.id);
      })
      .then((checklistArray) => {
        setAllChecklists(checklistArray);
      })
      .catch((error) => {
        console.error("Error deleting checklist:", error);
      });
  };

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Care History</h2>
        <p className="text-block">View your care history here!</p>
      </div>
      <section className="care-history">
        <CareHistoryFilterBar
          setSearchTerm={setSearchTerm}
          currentUser={currentUser}
        />
        {filteredChecklists.length > 0 ? (
          filteredChecklists.map((checklist) => (
            <ListGroup className="m-3" key={checklist.id}>
              <ListGroupItem
                color="success"
                onClick={() => navigate(`/history/${checklist.id}`)}
              >
                {new Date(checklist.timestamp).toISOString().split("T")[0]}
              </ListGroupItem>
              <ListGroupItem color="info">
                {findGardenBedName(checklist.gardenBedId)}
              </ListGroupItem>
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
          ))
        ) : (
          <p className="null-p">No care history found.</p>
        )}
      </section>
    </section>
  );
};
