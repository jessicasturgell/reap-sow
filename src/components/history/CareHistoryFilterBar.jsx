import { Input } from "reactstrap";

export const CareHistoryFilterBar = ({ setSearchTerm }) => {
  return (
    <div>
      <>
        <Input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          type="text"
          placeholder="Search Care History"
          className="mt-3 ms-3 w-25"
        />
      </>
    </div>
  );
};
