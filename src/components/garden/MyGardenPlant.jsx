import "./MyGarden.css";
import { deleteCrop } from "../../services/plantService.jsx";

export const MyGardenPlant = ({ plant, getAndSetPlants }) => {
  const handleDeleteCrop = (gardenPlot) => {
    deleteCrop(gardenPlot.id).then(() => {
      getAndSetPlants();
    });
  };

  return (
    <>
      {plant.newRow ? (
        <>
          <div className="break"></div>
          <div className="plot-change-container">
            <aside className="plot-change-btns">
              <span
                onClick={() => {
                  window.open(
                    `/garden/plant/edit/${plant.id}`,
                    "newwindow",
                    "width=600,height=400"
                  );
                }}
              >
                edit
              </span>{" "}
              | <span onClick={() => handleDeleteCrop(plant)}>delete</span>
            </aside>
            <div className="garden-plot" key={plant.id}>
              <img
                className="icon"
                src={plant.plant.icon}
                alt={plant.plant.name}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="plot-change-container">
            <aside className="plot-change-btns">
              <span
                onClick={() => {
                  window.open(
                    `/garden/plant/edit/${plant.id}`,
                    "newwindow",
                    "width=600,height=400"
                  );
                }}
              >
                edit
              </span>{" "}
              | <span onClick={() => handleDeleteCrop(plant)}>delete</span>
            </aside>
            <div className="garden-plot" key={plant.id}>
              <img
                className="icon"
                src={plant.plant.icon}
                alt={plant.plant.name}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
