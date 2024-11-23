import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";

import UserService from '../../services/UserService.js';
import { componentSchema } from './bikeValidationSchema.js';

const CreateBikeComponent = () => {
    const [responseMessage, setResponseMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { bikeId } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(componentSchema),
        mode: "onChange"
    });

    const doCreate = async (formData) => {
        setIsLoading(true);
        try {
            const response = await UserService.addComponentForBike(bikeId, formData);
            setResponseMessage(response.data.message);
            setTimeout(() => {
                navigate(`/bikes/${bikeId}/components`, { state: { refresh: true } });
            }, 3000);
        } catch (error) {
            const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setResponseMessage(errortext);
        } finally {
            setIsLoading(false);
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
                    <h1> New Component Details</h1>
                    <form onSubmit={handleSubmit(doCreate)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" {...register("name")} />
                            {errors?.name && <label className="error-feedback">{errors.name.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="manufacturer">Manufacturer</label>
                            <input type="text" {...register("manufacturer")} />
                            {errors?.manufacturer && <label className="error-feedback">{errors.manufacturer.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="text" {...register("price")} />
                            {errors?.price && <label className="error-feedback">{errors.price.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="quality">Quality</label>
                            <input type="text" {...register("quality")} />
                            {errors?.quality && <label className="error-feedback">{errors.quality.message}</label>}
                        </div>
                        <p></p>
                        <div className="form-group d-flex justify-content-between">
                            <button className="btn btn-primary btn-block" type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create'}
                            </button>
                            <button onClick={handleCancel} className="btn btn-secondary btn-block">
                                Cancel
                            </button>
                        </div>
                    </form>
                    <p></p>
                    {responseMessage && (
                        <div className="alert alert-success">
                            {responseMessage}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateBikeComponent;
