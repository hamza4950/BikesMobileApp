import { useState, useEffect } from "react";

import AuthService from "../services/AuthService";

const Profile = () => {

  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser()); 
  useEffect( () => {
    const user = AuthService.getCurrentUser();
    if(currentUser.username != user.username) 
      setCurrentUser(user); 
  }, [currentUser]) 
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "} {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
    </div>
  );
};

export default Profile;