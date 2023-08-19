import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

// export const loginRequest = async (user) => axios.post(`/auth/login`, user);
export const loginRequest = async (user) =>
  fetch("https://mern-crud-auth-13nh-dev.fl0.io/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json; charset=UTF-8" },
    credentials: "include",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
