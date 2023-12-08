import axios from 'axios';

const Api = axios.create({
    baseURL: "http://api.weatherapi.com/v1/"
})

export default Api;