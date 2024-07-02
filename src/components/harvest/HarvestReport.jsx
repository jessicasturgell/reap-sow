import "./Harvest.css";
import { useEffect, useState } from "react";
import {
  deleteHarvestReport,
  getHarvestReportsByUserId,
} from "../../services/harvestService.jsx";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { HarvestReportFilterBar } from "./HarvestReportFilterBar.jsx";

export const HarvestReport = ({ currentUser }) => {
  const [allHarvestReports, setAllHarvestReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHarvestReports, setFilteredHarvestReports] = useState([]);

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

  useEffect(() => {
    const foundHarvestReport = allHarvestReports.filter((harvest) =>
      harvest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHarvestReports(foundHarvestReport);
  }, [searchTerm, allHarvestReports]);

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Harvest Reports</h2>
        <p className="text-block">
          Manage your previous harvest reports and create new harvest reports to
          track your yield here!
        </p>
      </div>
      <div className="filter-bar">
        <HarvestReportFilterBar
          setSearchTerm={setSearchTerm}
          currentUser={currentUser}
        />
        <Button
          className="mt-3 me-3"
          color="success"
          onClick={() => navigate("/harvest/create")}
        >
          New Harvest Report
        </Button>
      </div>
      <section className="harvest-container">
        {filteredHarvestReports.length > 0 ? (
          filteredHarvestReports.map((harvest) => (
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
          ))
        ) : (
          <p>No harvest reports found.</p>
        )}
      </section>
    </section>
  );
};
