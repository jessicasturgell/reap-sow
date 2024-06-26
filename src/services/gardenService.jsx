export const getGardenBedsByUserId = (userId) => {
  return fetch(`http://localhost:8088/gardenBeds?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const getGardenBedsById = (gardenBedId) => {
  return fetch(`http://localhost:8088/gardenBeds/${gardenBedId}`).then((res) =>
    res.json()
  );
};

export const createNewGardenBed = (gardenBed) => {
  return fetch(`http://localhost:8088/gardenBeds`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gardenBed),
  });
};

export const deleteGardenBed = (gardenBedId) => {
  return fetch(`http://localhost:8088/gardenBeds/${gardenBedId}`, {
    method: "DELETE",
  });
};

export const updateGardenBed = (gardenBed) => {
  return fetch(`http://localhost:8088/gardenBeds/${gardenBed.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gardenBed),
  });
};
