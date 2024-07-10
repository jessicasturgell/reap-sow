import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Row,
  UncontrolledCarousel,
} from "reactstrap";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <UncontrolledCarousel
        className="banners"
        items={[
          {
            altText: "Planters with seedlings.",
            caption: "Welcome to Reap/Sow!",
            key: 1,
            src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            altText: "An indoor greenhouse with tomatoes growing on the vine.",
            caption: "Map, manage, and edit your garden beds.",
            key: 2,
            src: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            altText: "A basket of colorful vegetables.",
            caption: "Utilize daily care checklists and track your yield!",
            key: 3,
            src: "https://images.unsplash.com/photo-1624668430039-0175a0fbf006?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ]}
      />
      <section className="welcome-content-container">
        <div className="welcome-text-container">
          <h1 className="welcome-h1">Hello!</h1>
          <h2 className="welcome-h2">
            Reap/Sow is a garden management system developed for and by
            Appalachian gardeners. We hope that these tools can be utilized
            across the region to ensure the continued development of local
            agriculture.<hr></hr>Try visiting one of the pages below to get
            started!
          </h2>
        </div>
        <Row>
          <Col sm="6">
            <Card body className="card-edit">
              <CardTitle tag="h5">Manage Your Garden</CardTitle>
              <CardText>
                Explore "My Garden" to manage your garden beds, view planted
                crops, and utilize daily care checklists to keep your garden
                healthy and thriving.
              </CardText>
              <Button color="success" onClick={() => navigate("/garden")}>
                My Garden
              </Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body className="card-edit">
              <CardTitle tag="h5">Explore Common Plants</CardTitle>
              <CardText>
                Discover a comprehensive database of common plants, including
                detailed care instructions and gardening tips to help you plan
                and care for your garden effectively.
              </CardText>
              <Button color="success" onClick={() => navigate("/plants")}>
                Common Plants Database
              </Button>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};
