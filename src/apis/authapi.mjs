import axios from 'axios';
import { BASE_URL } from './config.mjs';

<<<<<<< HEAD
const BASE_URL = 'http://localhost:3000'; // change to your backend base URL

=======
>>>>>>> 1cd2102669cccaad6c76db0478eb979d2e88bae9
// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Login API
<<<<<<< HEAD
export const loginUser = async ({ username, password }) => {
  try {
    const response = await axiosInstance.post('/api/login', {
      username,
=======
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('/api/login', {
      email,
>>>>>>> 1cd2102669cccaad6c76db0478eb979d2e88bae9
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error.response?.data || { message: 'Login error' };
  }
};

// Signup API
export const signupUser = async ({ username, email, password }) => {
  try {
    const response = await axiosInstance.post('/api/signup', {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error.response?.data || { message: 'Signup error' };
  }
};
<<<<<<< HEAD
=======

const AUTH_APIS = {
    loginUser,
    signupUser
};

export default AUTH_APIS;
>>>>>>> 1cd2102669cccaad6c76db0478eb979d2e88bae9
