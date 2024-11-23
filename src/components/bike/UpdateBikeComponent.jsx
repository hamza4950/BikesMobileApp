import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import UserService from '../../services/UserService.js';
import { componentSchema } from './bikeValidationSchema.js';

const UpdateBikeComponent = () => {
    const [responseMessage, setResponseMessage] = useState();
    const [isLoading, setIsLoading] = useState(true); 
    const [isUpdating, setIsUpdating] = useState(false); 
    const navigate = useNavigate();
    const { componentId } = useParams(); 
    const [component, setComponent] = useState(null);

    const fetchComponent = async () => {
        try {
            const response = await UserService.getComponentById(componentId);
            const component = response.data.data;
            setComponent(component);
            setIsLoading(false);  
        } catch (error) {
            console.error(error);
            setIsLoading(false);  
        }
    };

    useEffect(() => {
        fetchComponent();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(componentSchema),
        mode: "onChange"
    });

    const doUpdate = async (formData) => {
        setIsUpdating(true);  
        try {
            const response = await UserService.changeComponentForBike(componentId, formData);
            setResponseMessage(response.data.message);
            setTimeout(() => {
                navigate(-1, { state: { refresh: true } });
            }, 2000);
        } catch (error) {
            const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setResponseMessage(errortext);
        } finally {
            setIsUpdating(false); // Set loading to false after update attempt
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    if (isLoading) {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h1>Update Component Details</h1>
                <form onSubmit={handleSubmit(doUpdate)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" {...register("name")} defaultValue={component.name} />
                        {errors?.name && <label className="error-feedback">{errors.name.message}</label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <input type="text" {...register("manufacturer")} defaultValue={component.manufacturer} />
                        {errors?.manufacturer && <label className="error-feedback">{errors.manufacturer.message}</label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" {...register("price")} defaultValue={component.price} min="0" />
                        {errors?.price && <label className="error-feedback">{errors.price.message}</label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="quality">Quality</label>
                        <input type="text" {...register("quality")} defaultValue={component.quality} />
                        {errors?.quality && <label className="error-feedback">{errors.quality.message}</label>}
                    </div>
                    <br />
                    <br />
                    <div className="form-group d-flex justify-content-between">
                        <button className="btn btn-primary btn-block" type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Updating...' : 'Update'}
                        </button>
                        <button onClick={handleCancel} className="btn btn-secondary btn-block">
                            Cancel
                        </button>
                    </div>
                </form>
                {responseMessage && (
                    <div className="alert alert-success">
                        {responseMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateBikeComponent;

