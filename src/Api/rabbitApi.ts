// src/api/catApi.ts
import {API_URLS} from './apiConfig';
import axios from 'axios';

export const getRabbit = async () => {
  try {
    const response = await axios.get(API_URLS.rabbit);
    return response.data;
  } catch (error) {
    console.error('Error fetching rabbit:', error);
    throw error;
  }
};

export const addRabbit = async (rabbitData: {
  name: string;
  type: string;
  owner: string;
  dateTaken: string;
}) => {
  try {
    const response = await axios.post(API_URLS.rabbit, rabbitData);
    return response.data;
  } catch (error) {
    console.error('Error adding rabbit:', error);
    throw error;
  }
};

export const updateRabbit = async (
  id: string,
  updatedRabbitData: {
    name: string;
    type: string;
    owner: string;
    dateTaken: string;
  },
) => {
  try {
    const response = await axios.put(
      `${API_URLS.rabbit}/${id}`,
      updatedRabbitData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating rabbit:', error);
    throw error;
  }
};

export const deleteRabbit = async (id: number) => {
  try {
    await axios.delete(`${API_URLS.rabbit}/${id}`);
  } catch (error) {
    console.error('Error deleting rabbit:', error);
    throw error;
  }
};

export const sendRabbitToTitipan = async (rabbitData: {
  name: string;
  type: string;
  owner: string;
  dateTaken: string;
}) => {
  try {
    const response = await axios.post(API_URLS.titipan3, rabbitData);
    return response.data;
  } catch (error) {
    console.error('Error sending rabbit to TitipanScreen:', error);
    throw error;
  }
};

export const getTitipanRabbits = async () => {
  try {
    const response = await axios.get(API_URLS.titipan3);
    return response.data;
  } catch (error) {
    console.error('Error fetching titipan rabbit:', error);
    throw error;
  }
};
