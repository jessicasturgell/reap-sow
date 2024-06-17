export const getAllPlants = () => {
    return fetch(
      "http://localhost:8088/plants"
    ).then((res) => res.json());
  };