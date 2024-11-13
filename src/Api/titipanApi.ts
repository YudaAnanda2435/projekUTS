// src/api/titipanApi.ts
import {API_URLS} from './apiConfig';
import axios from 'axios';

export const getTitipan = async () => {
  try {
    const response = await axios.get(API_URLS.titipan);
    return response.data;
  } catch (error) {
    console.error('Error fetching titipan:', error);
    throw error;
  }
};

export const addTitipan = async (titipanData: {
  name: string;
  type: string;
  owner: string;
  dateTaken: string;
}) => {
  try {
    const response = await axios.post(API_URLS.titipan, titipanData);
    return response.data;
  } catch (error) {
    console.error('Error adding titipan:', error);
    throw error;
  }
};

export const deleteDog = async (id: string) => {
  try {
    await axios.delete(`${API_URLS.titipan}/${id}`);
  } catch (error) {
    console.error('Error deleting dog:', error);
    throw error;
  }
};

export const deleteCat = async (id: string) => {
  try {
    await axios.delete(`${API_URLS.titipan2}/${id}`);
  } catch (error) {
    console.error('Error deleting Cat:', error);
    throw error;
  }
};

export const deleteRabbit = async (id: string) => {
  try {
    await axios.delete(`${API_URLS.titipan3}/${id}`);
  } catch (error) {
    console.error('Error deleting rabbit:', error);
    throw error;
  }
};
