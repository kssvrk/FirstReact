import { useState, useEffect } from "react";
import { WhichUser } from "../../services/AuthToken";

const Home = () => {
  const [user, setUser] = useState("");
  if(user===""){WhichUser(setUser)}
  //console.log(user);
  if (user === "") 
  { 
    return (
      <div class="spinner-border text-light" role="status">
        
      </div>
    )
    
  }
  else{
    
    return (
      <div>
        <h1>Welcome to Aikops {user.email}</h1>
      </div>
    );
  }

  

  //console.log(user);
  
};

export default Home;
