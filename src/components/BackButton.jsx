// src/components/BackButton.jsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  // Do not show the back button on the homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <button className="btn btn-link text-dark" onClick={handleBack}>
      <i className="bi bi-arrow-left"></i> Back
    </button>
  );
};

export default BackButton;
