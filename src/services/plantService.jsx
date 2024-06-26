export const getAllPlants = () => {
  return fetch("http://localhost:8088/plants").then((res) => res.json());
};

export const getPlantsByGardenPlot = (userId) => {
  return fetch(
    `http://localhost:8088/gardenPlots/?userId=${userId}&_expand=gardenBed&_expand=plant`
  ).then((res) => res.json());
};

export const getGardenPlotById = (gardenPlotId) => {
  return fetch(
    `http://localhost:8088/gardenPlots/?id=${gardenPlotId}`
  ).then((res) => res.json());
}

export const plantNewCrop = (gardenBed) => {
  return fetch(`http://localhost:8088/gardenPlots`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gardenBed),
  });
};

export const deleteCrop = (gardenPlotId) => {
  return fetch(`http://localhost:8088/gardenPlots/${gardenPlotId}`, {
    method: "DELETE",
  });
};

export const editPlantedCrop = (gardenPlot) => {
  return fetch(`http://localhost:8088/gardenPlots/${gardenPlot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gardenPlot),
  });
};
