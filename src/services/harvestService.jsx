export const getHarvestReportsByUserId = (userId) => {
  return fetch(`http://localhost:8088/harvests?userId=${userId}`).then((res) =>
    res.json()
  );
};

export const createNewHarvestReport = (harvest) => {
  return fetch(`http://localhost:8088/harvests`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(harvest),
  });
};

export const deleteHarvestReport = (harvestId) => {
  return fetch(`http://localhost:8088/harvests/${harvestId}`, {
    method: "DELETE",
  });
};

export const getHarvestReportsById = (harvestId) => {
  return fetch(`http://localhost:8088/harvests/${harvestId}`).then((res) =>
    res.json()
  );
};

export const updateHarvestReport = (harvest) => {
  return fetch(`http://localhost:8088/harvests/${harvest.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(harvest),
  });
};
