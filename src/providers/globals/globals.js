import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

// set the token from the session storage
export const setToken = (token) => {
    sessionStorage.setItem('token', token);
}

// set user from the session storage
export const setUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// return the user data from the session storage
export const getUser = () => {

    let userStr = sessionStorage.getItem('user');

    if (userStr) {
        return JSON.parse(userStr);
    } else {
        return null;
    }
}

// clear the session storage
export const clearStorage = () => {
    sessionStorage.clear();
}

export const loadDashboardCharts = () => {
    window.callThejQueryDashboardCharts();
}

export const loadDataTable = () => {
    window.callThejQueryDataTable();
}

export const confirmBox = (message, callback) => {

    alertify.confirm(
        "Confirmation",
        message,
        function () {
            callback(true)
        },
        function () {
            callback(false)
        });
}

export const promptBox = (message, callback) => {
    alertify.prompt(
        "Confirmation",
        message,
        function (evt, value) {
            callback(true, value)
        },
        function () {
            callback(false)
        });
}

export const successMessage = (message) => {

    alertify.success(message);
}

export const errorMessage = (message) => {

    alertify.error(message);
}