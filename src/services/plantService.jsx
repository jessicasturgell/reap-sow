export const getAllPlants = () => {
  return fetch("http://localhost:8088/plants").then((res) => res.json());
};

export const getPlantsByGardenPlot = (userId) => {
  return fetch(
    `http://localhost:8088/gardenPlots/?userId=${userId}&_expand=gardenBed&_expand=plant`
  ).then((res) => res.json());
};

export const plantNewCrop = (gardenBed) => {
  return fetch(`http://localhost:8088/gardenPlots`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gardenBed),
  });
};
