import React, { useEffect, useState } from "react";
import apiClient from "../services/api";

export default function ActiveData(dataType) {
    const [notifications, setNotifications] = useState();
    const getActiveNotifications = () => {
        apiClient
            .get(`/active-notifications/`)
            .then((res) => {
                setNotifications(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [tutorials, setTutorials] = useState();
    const getActiveTutorials = () => {
        apiClient
            .get(`/active-tutorials/`)
            .then((res) => {
                setTutorials(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [products, setProducts] = useState();
    const getActiveProducts = () => {
        apiClient
            .get(`/active-product/`)
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [blogs, setBlogs] = useState();
    const getActiveBlogs = () => {
        apiClient
            .get(`/active-blog/`)
            .then((res) => {
                setBlogs(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [services, setServices] = useState();
    const getActiveServices = () => {
        apiClient
            .get(`/active-services/`)
            .then((res) => {
                setServices(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getActiveNotifications();
        getActiveTutorials();
        getActiveProducts();
        getActiveBlogs();
        getActiveServices();
    }, []);

    if (dataType == "notifications") {
        return notifications;
    } else if (dataType == "tutorials") {
        return tutorials;
    } else if (dataType == "products") {
        return products;
    } else if (dataType == "blogs") {
        return blogs;
    } else if (dataType == "services") {
        return services;
    } else {
        return null;
    }
}
