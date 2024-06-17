import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localReapUser = localStorage.getItem("reap_user");
    const reapUserObject = JSON.parse(localReapUser);

    setCurrentUser(reapUserObject);
  }, []);

  return <h1>Plants</h1>;
};
