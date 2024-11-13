// src/api/dogApi.ts
import {API_URLS} from './apiConfig';
import axios from 'axios';

export const getDogs = async () => {
  try {
    const response = await axios.get(API_URLS.dogs);
    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
    throw error;
  }
};

export const addDog = async (dogData: {
  name: string;
  type: string;
  owner: string;
  dateTaken: string;
}) => {
  try {
    const response = await axios.post(API_URLS.dogs, dogData);
    return response.data;
  } catch (error) {
    console.error('Error adding dog:', error);
    throw error;
  }
};

export const updateDog = async (
  id: string,
  updatedDogData: {
    name: string;
    type: string;
    owner: string;
    dateTaken: string;
  },
) => {
  try {
    const response = await axios.put(`${API_URLS.dogs}/${id}`, updatedDogData);
    return response.data;
  } catch (error) {
    console.error('Error updating dog:', error);
    throw error;
  }
};

export const deleteDog = async (id: string) => {
  try {
    await axios.delete(`${API_URLS.dogs}/${id}`);
  } catch (error) {
    console.error('Error deleting dog:', error);
    throw error;
  }
};

export const sendDogToTitipan = async (dogData: {
  name: string;
  type: string;
  owner: string;
  dateTaken: string;
}) => {
  try {
    const response = await axios.post(API_URLS.titipan, dogData);
    return response.data;
  } catch (error) {
    console.error('Error sending dog to TitipanScreen:', error);
    throw error;
  }
};

export const getTitipanDogs = async () => {
  try {
    const response = await axios.get(API_URLS.titipan);
    return response.data;
  } catch (error) {
    console.error('Error fetching titipan dogs:', error);
    throw error;
  }
};

