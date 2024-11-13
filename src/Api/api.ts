import axios from 'axios';
import {API_URLS} from './apiConfig';

axios
  .get(API_URLS.cats)
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    if (error.response) {
      console.error('Error response:', error.response);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  });

export const getDogs = async () => {
  try {
    const response = await axios.get(API_URLS.dogs);
    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
    throw error;
  }
};

export const getRabbits = async () => {
  try {
    const response = await axios.get(API_URLS.rabbit);
    return response.data;
  } catch (error) {
    console.error('Error fetching rabbits:', error);
    throw error;
  }
};

