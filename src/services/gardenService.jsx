export const getGardenBedsByUserId = (userId) => {
    return fetch(
      `http://localhost:8088/gardenBeds/?userId=${userId}`
    ).then((res) => res.json());
  };