import { useState, useEffect } from "react";
import { WhichUser } from "../../services/AuthToken";

const Home = () => {
  const [user, setUser] = useState("");
  let edit = false;
  let callback = (data) => {
    setUser(data.username);
  };
  if (user === "") WhichUser(setUser);

  //console.log(user);
  return (
    <div>
      <h1>Welcome to Aikops {user.email}</h1>
    </div>
  );
};

export default Home;
