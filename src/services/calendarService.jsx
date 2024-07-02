export const getAllDates = () => {
  return fetch(`http://localhost:8088/dates`).then((res) => res.json());
};

export const getDatesByUserId = (userId) => {
  return fetch(`http://localhost:8088/dates?userId=${userId}`).then((res) =>
    res.json()
  );
};

export const addNewDate = (date) => {
  return fetch(`http://localhost:8088/dates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  });
};
