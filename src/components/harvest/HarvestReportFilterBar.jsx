import { Input } from "reactstrap";

export const HarvestReportFilterBar = ({ setSearchTerm }) => {
  return (
    <div className="filter-input">
      <>
        <Input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          type="text"
          placeholder="Search by plant (ex. Tomato)"
          className="mt-3 ms-3"
        />
      </>
    </div>
  );
};
