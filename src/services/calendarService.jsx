export const getAllDates = () => {
    return fetch(`http://localhost:8088/dates`).then((res) =>
      res.json()
    );
  };