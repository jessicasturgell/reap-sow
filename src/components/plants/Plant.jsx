import "./PlantList.css";
import React, { useEffect, useState } from "react";
import { getAllPlants } from "../../services/plantService.jsx";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

export const PlantList = () => {
  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => {
    getAllPlants().then((plantArray) => {
      setAllPlants(plantArray);
    });
  }, []);

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Common Plants Database</h2>
        <p className="text-block">
          Review common crops, their descriptions, and basic care instructions
          here!
        </p>
      </div>
      <section className="plantlist">
        {allPlants.map((plant) => (
          <Card
            className="m-3"
            key={plant.id}
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample" src={plant.img} />
            <CardBody>
              <CardTitle tag="h5">{plant.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {plant.description}
              </CardSubtitle>
              <CardText>{plant.care_instructions}</CardText>
            </CardBody>
          </Card>
        ))}
      </section>
    </section>
  );
};
