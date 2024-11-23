import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from '../components/BackButton.jsx';

const About = () => (
  <div className="About container mt-5 mb-5">
    <div className="card p-4 shadow-sm bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <BackButton />
        <h1 className="text-primary fw-bold mb-0">About Us</h1>
      </div>
      <hr />
      <p>
        Welcome to Bikes! Our mission is to provide you with the best selection of motorbikes and motorbike components.
        Whether you're an experienced rider or just starting out, we have everything you need to enjoy your ride.
      </p>
      <p>
        Our app allows you to explore various motorbike models, browse through different components, and learn more about
        the specifications and features that matter to you. We believe in empowering our users with detailed
        information and high-quality products to enhance their riding experience.
      </p>
      <p>
        At Bikes, we are passionate about motorbiking and committed to providing exceptional customer service. Our team
        consists of experienced professionals who are always ready to assist you in finding the perfect motorbike and
        accessories. We work closely with top manufacturers to ensure that our inventory includes the latest models
        and the highest quality parts.
      </p>
      <p>
        Thank you for choosing Bikes. We are dedicated to helping you find the right motorbike and components to meet your
        needs and exceed your expectations. Ride on!
      </p>
      <div className="d-flex justify-content-end mt-3">
        <a className="btn btn-success" href="/">Home</a>
      </div>
    </div>
  </div>
);

export default About;
