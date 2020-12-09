import { FETCH_ORDERS,API_HOST,FETCH_ORDER } from './types';
import axios from "axios";

    // Add a request interceptor
    axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        return config;
    },
    error => {
        Promise.reject(error)
    });

export const getOrdersCount = (post) => dispatch => {
    let postData = post;

    axios.post(API_HOST+'/order/getordercountdatewise',postData)
        .then((res) => dispatch({
            type: FETCH_ORDERS,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const getOrders = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/getorderdetails.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDERS,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const getOrdersByStatus = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/getorderbystatus.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDERS,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const dwnldReports = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/reports.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDERS,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const getOrder = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/getsingleorder.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDERS,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const cancelOrder = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/updateorderstatus.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDER,
            payload: res.data
        }))
        .then(axios.post(API_HOST+'/api.php?exec=sendCancelMail',postData))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const rejectReturn = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/updateorderstatus.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDER,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const approveOrder = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/updateorderstatus.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDER,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};

export const rejectOrder = (post) => dispatch => {
    let postData = post;
    axios.post(API_HOST+'/updateorderstatus.php',postData)
        .then((res) => dispatch({
            type: FETCH_ORDER,
            payload: res.data
        }))
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
};






