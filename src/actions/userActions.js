import { FETCH_USER , LOGIN_ERR,API_HOST , FETCH_DASH } from './types';
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

    
export const sendOTP = (post) => dispatch => {
    let postData = post;

    axios.post(API_HOST+'/api.php?exec=sendEmailOTP',postData)
        .then((res) => dispatch({
            type: FETCH_USER,
            payload: res.data
        }))
        .catch((err) => {
            dispatch({
                type: LOGIN_ERR,
                payload: err
            })
            
            console.log("AXIOS ERROR: ", err);
        })
};

export const getStoreDash = (post) => dispatch => {
    let postData = post;

    axios.post(API_HOST+'/getdashboard.php',postData)
        .then((res) => dispatch({
            type: FETCH_DASH,
            payload: res.data
        }))
        .catch((err) => {
            dispatch({
                type: LOGIN_ERR,
                payload: err
            })
            
            console.log("AXIOS ERROR: ", err);
        })
};

export const validateUser = (post) => dispatch => {
    let postData = post;

    axios.post(API_HOST+'/api.php?exec=verifyOTP',postData)
        .then((res) => dispatch({
            type: FETCH_USER,
            payload: res.data
        }))
        .catch((err) => {
            dispatch({
                type: LOGIN_ERR,
                payload: err
            })
            
            console.log("AXIOS ERROR: ", err);
        })
};








