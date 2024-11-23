import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import UserService from '../../services/UserService.js';

const BikeDelete = () => {
    const { bikeId } = useParams();
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await UserService.deleteBikeForUser(bikeId);
            setResponseMessage(response.data.message);
            setTimeout(() => {
                navigate('/bikes');
            }, 3000);
        } catch (error) {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setResponseMessage(errorMessage);
            setTimeout(() => {
                navigate(-1);
            }, 3000);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h1> Delete Bike</h1>
                <p>Are you sure you want to delete this bike?</p>
                <p>{responseMessage}</p>
                <div className="form-group d-flex justify-content-between">
                    <button onClick={handleDelete} className="btn btn-danger">
                        Delete
                    </button>
                    <button onClick={handleCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BikeDelete;
