import "./Harvest.css";
import { useEffect, useState } from "react";
import {
  deleteHarvestReport,
  getHarvestReportsByUserId,
} from "../../services/harvestService.jsx";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const HarvestReport = ({ currentUser }) => {
  const [allHarvestReports, setAllHarvestReports] = useState([]);
  const navigate = useNavigate();

  const getAndSetHarvestReports = () => {
    if (currentUser?.id) {
      getHarvestReportsByUserId(currentUser.id)
        .then((harvestReportArray) => {
          setAllHarvestReports(harvestReportArray);
        })
        .catch((error) => {
          console.error("Error fetching harvest reports:", error);
        });
    }
  };

  useEffect(() => {
    getAndSetHarvestReports();
  }, [currentUser]);

  const handleDelete = (harvest) => {
    deleteHarvestReport(harvest.id)
      .then(() => {
        return getHarvestReportsByUserId(currentUser.id);
      })
      .then((harvestReportArray) => {
        setAllHarvestReports(harvestReportArray);
      })
      .catch((error) => {
        console.error("Error deleting harvest report:", error);
      });
  };

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Harvest Reports</h2>
        <p className="text-block">
          Manage your previous harvest reports and create new harvest reports to
          track your yield here!
        </p>
      </div>
      <Button
        className="mt-3 ms-3"
        color="success"
        onClick={() => navigate("/harvest/create")}
      >
        New Harvest Report
      </Button>
      <section className="harvest-container">
        {allHarvestReports.map((harvest) => (
          <section className="harvest-reports" key={harvest.id}>
            <ListGroup className="m-3">
              <ListGroupItem color="success">
                Plant: {harvest.name}
              </ListGroupItem>
              <ListGroupItem color="info">
                Garden Bed: {harvest.gardenBedName}
              </ListGroupItem>
              <ListGroupItem color="warning">
                Date Planted: {harvest.datePlanted}
              </ListGroupItem>
              <ListGroupItem color="warning">
                Date Harvested: {harvest.dateHarvested}
              </ListGroupItem>
              <ListGroupItem color="warning">
                Weight: {harvest.weight} grams
              </ListGroupItem>
              <ListGroupItem color="danger">
                Notes: {harvest.notes !== "" ? harvest.notes : "No notes!"}
              </ListGroupItem>
              <ListGroupItem color="success" className="care-btn-container">
                <Button
                  className="m-1"
                  color="warning"
                  onClick={() => navigate(`/harvest/edit/${harvest.id}`)}
                >
                  Edit
                </Button>
                <Button
                  className="m-1"
                  color="danger"
                  onClick={() => handleDelete(harvest)}
                >
                  Delete
                </Button>
              </ListGroupItem>
            </ListGroup>
          </section>
        ))}
      </section>
    </section>
  );
};
