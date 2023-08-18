import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-crud-auth-13nh-dev.fl0.io',
  withCredentials: true,
});
export default instance;
