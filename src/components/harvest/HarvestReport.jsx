import { useEffect, useState } from "react";
import { getHarvestReportsByUserId } from "../../services/harvestService.jsx";
import { ListGroup, ListGroupItem } from "reactstrap";

export const HarvestRreport = ({ currentUser }) => {
  const [allHarvestReports, setAllHarvestReports] = useState([]);

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
  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Harvest Reports</h2>
        <p className="text-block">
          Manage your previous harvest reports and create new harvest reports to
          track your yield here!
        </p>
      </div>
      <section className="care-history">
        {allHarvestReports.map((harvest) => (
          <ListGroup className="m-3" key={harvest.id}>
            <ListGroupItem color="success">{harvest.id}</ListGroupItem>
          </ListGroup>
        ))}
      </section>
    </section>
  );
};
