import "./Welcome.css";
import { UncontrolledCarousel } from "reactstrap";

export const Welcome = () => {
  return (
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
  );
};
