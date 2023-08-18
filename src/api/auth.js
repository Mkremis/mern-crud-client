import axios from 'axios';

const API = 'https://mern-crud-auth-13nh-dev.fl0.io';

export const registerRequest = (user) => axios.post(`${API}/register`, user);
