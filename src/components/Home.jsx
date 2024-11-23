import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const user = AuthService.getCurrentUser();
    setIsLoggedIn(!!user);
    setIsLoading(false);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      {isLoading ? (
        <p>Loading...</p>
      ) : isLoggedIn ? (
        <div className="text-center">
          <h1>Welcome to the Bike CRUD</h1>
          <br />
          <h2>To handle CRUD operations, please click the button below to go to the bike page</h2>
          <br />
          <a className="btn btn-success" href="/bikes">Bikes</a>
        </div>
      ) : (
        <div className="text-center">
          <h1>Welcome to the Bike CRUD Mobile App</h1>
          <br />
          <h2>Please Login or Register to handle CRUD</h2>
          <br />
          <a className="btn btn-primary" href="/login">Login</a>
        </div>
      )}
    </div>
  );
};

export default HomePage;
