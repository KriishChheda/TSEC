import axios from 'axios';
import { BASE_URL } from './config.mjs';

const BASE_URL = 'http://localhost:3000'; // change to your backend base URL

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Login API
export const loginUser = async ({ username, password }) => {
  try {
    const response = await axiosInstance.post('/api/login', {
      username,
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
