import axios from 'axios';

const orderAxiosInstance = axios.create({
    baseURL: 'https://burger-app-fff2f.firebaseio.com/'
});

export default orderAxiosInstance;