import { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from '../../services/UserService.js';
import { bikeSchema } from './bikeValidationSchema.js';

const BikeUpdate = () => {
    const { bikeId } = useParams();
    const [responseMessage, setResponseMessage] = useState();
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const location = useLocation();
    const [currentBike] = useState(location.state);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(bikeSchema),
        mode: "onChange"
    });

    const doUpdate = async (formData) => {
        setIsLoading(true); // Start loading
        try {
            const response = await UserService.changeBikeForUser(bikeId, formData);
            setResponseMessage(response.data.message);
            setTimeout(() => {
                navigate("/bikes");
            }, 3000);
        } catch (error) {
            const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setResponseMessage(errortext);
            setTimeout(() => {
                navigate(-1);
            }, 3000);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <>
            <div className="col-md-12">
                <div className="card card-container">
                    <h1> Update Bike</h1>
                    <form onSubmit={handleSubmit(doUpdate)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" {...register("name")} defaultValue={currentBike.name} />
                            {errors?.name && <label className="error-feedback">{errors.name.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="manufacturer">Manufacturer</label>
                            <input type="text" {...register("manufacturer")} defaultValue={currentBike.manufacturer} />
                            {errors?.manufacturer && <label className="error-feedback">{errors.manufacturer.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input type="text" {...register("year")} defaultValue={currentBike.year} />
                            {errors?.year && <label className="error-feedback">{errors.year.message}</label>}
                        </div>
                        <p></p>
                        <div className="form-group d-flex justify-content-between">
                            <button className="btn btn-primary btn-block" type="submit" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update'}
                            </button>
                            <button onClick={handleCancel} className="btn btn-secondary btn-block" disabled={isLoading}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    <p></p>
                    {responseMessage && (
                        <div className="alert alert-success">
                            {responseMessage}
                        </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default BikeUpdate;
