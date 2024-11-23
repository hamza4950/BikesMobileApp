import { useEffect, useState } from "react";
import UserService from '../../services/UserService.js';
import Table from "../Table.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAllBikes = () => {
    setLoading(true);
    UserService.fetchBikesForUser()
      .then(res => {
        setBikes(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllBikes();
  }, []);

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'manufacturer', label: 'Manufacturer' },
    { name: 'year', label: 'Year' }
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="card p-4 shadow-sm bg-light">
        <h1 className="mb-4 text-center text-primary fw-bold">User's Bikes</h1>
        <div className="d-flex justify-content-end mb-3">
          <a className="btn btn-success" href="/bikes/create">Add New Bike</a>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <Table caption="Bikes" fields={fields} rows={bikes} resourceName="bikes" />
          </div>
        )}
        <div className="d-flex justify-content-end mt-3">
          <button type="button" className="btn btn-primary" onClick={getAllBikes}>Refresh</button>
        </div>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default Bikes;
