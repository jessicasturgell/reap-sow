export const getHarvestReportsByUserId = (userId) => {
  return fetch(`http://localhost:8088/harvests?userId=${userId}`).then((res) =>
    res.json()
  );
};
