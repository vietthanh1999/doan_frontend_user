import axios from 'axios';
import cookies from 'react-cookies';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

export let addressAPI = axios.create({
    baseURL: 'https://provinces.open-api.vn/api/?depth=3'
});

export let AuthAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Authorization': `Bearer ${cookies.load('access_token')}`
    }
})

export let endpoints = {
    'type_house': '/type-house/',
    'houses': '/houses/',
    'users': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'oauth2-info': '/oauth2-info',
    'auth-login': '/auth/login/',
    'rent-manage': '/rent-manage/',
    'house-for-rent': '/house-for-rent/'
}