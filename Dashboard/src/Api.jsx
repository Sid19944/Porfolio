import axios from "axios";

const userApi = axios.create({
  baseURL: "https://porfolio-backend-xxof.onrender.com/auth/v1/user",
  withCredentials: true,
});

const skillApi = axios.create({
  baseURL: "https://porfolio-backend-xxof.onrender.com/auth/v1/skills",
  withCredentials: true,
});

const messageApi = axios.create({
  baseURL: "https://porfolio-backend-xxof.onrender.com/auth/v1/message",
  withCredentials: true,
});

const projectApi = axios.create({
  baseURL: "https://porfolio-backend-xxof.onrender.com/auth/v1/project",
  withCredentials: true,
});

const timeLineApi = axios.create({
  baseURL: "https://porfolio-backend-xxof.onrender.com/auth/v1/timeline",
  withCredentials: true,
});

export { userApi, skillApi, messageApi, projectApi, timeLineApi };
