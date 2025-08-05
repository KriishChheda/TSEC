import axios from 'axios';
import { BASE_URL } from './config.mjs';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Login API
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('/api/login', {
      email,
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

const AUTH_APIS = {
    loginUser,
    signupUser
};

export default AUTH_APIS;
