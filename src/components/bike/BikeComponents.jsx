import { useEffect, useState } from "react";
import UserService from '../../services/UserService.js';
import { useParams } from 'react-router-dom';
import ComponentTable from "../ComponentTable.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../BackButton.jsx";

const BikeComponents = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { bikeId } = useParams();

  const getAllComponents = () => {
    setLoading(true);
    UserService.fetchComponentsForBike(bikeId)
      .then(res => {
        setComponents(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllComponents();
  }, []);

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'manufacturer', label: 'Manufacturer' },
    { name: 'price', label: 'Price' },
    { name: 'quality', label: 'Quality' }
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="card p-4 shadow-sm bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <BackButton />
          <h1 className="text-primary fw-bold mb-0">Bike's Components</h1>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <a className="btn btn-success" href={`/bikes/${bikeId}/components/create`}>Add New Component</a>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <ComponentTable caption="Components" fields={fields} rows={components} resourceName="components" />
          </div>
        )}
        <div className="d-flex justify-content-end mt-3">
          <button type="button" className="btn btn-primary" onClick={getAllComponents}>Refresh</button>
        </div>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default BikeComponents;
