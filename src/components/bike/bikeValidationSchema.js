import * as yup from "yup";

export const bikeSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required!")
        .min(1, "Must be at least 1 characters!")
        .max(100, "Must be maximum 100 characters!"),

    manufacturer: yup
        .string()
        .min(1, "Must be at least 1 characters!")
        .required("manufacturer is required!"),

    year: yup
        .number()
        .required("Year is required!"),


});

export const componentSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required!")
        .min(1, "Must be at least 1 characters!")
        .max(100, "Must be maximum 100 characters!"),

    manufacturer: yup
        .string()
        .min(1, "Must be at least 1 characters!")
        .required("manufacturer is required!"),

    price: yup
        .number()
        .required("Price is required!"),

    quality: yup.string().optional()
})

