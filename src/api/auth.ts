import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL_PROXY;

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('accessToken');
  return token ? { 'access-token': token } : {};
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    console.log('Login API response:', response);

    const token = response.headers['access-token'];
    if (token) {
      sessionStorage.setItem('accessToken', token);
      console.log('Access token saved to sessionStorage:', token);
      return { access_token: token };
    } else {
      throw new Error('No access token in response headers');
    }
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const logout = () => {
  sessionStorage.removeItem('accessToken');
};
