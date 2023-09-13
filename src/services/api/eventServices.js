// services/api/eventsService.ts
import axios from 'axios';
import API_BASE_URL from './apiConfig'; // Import the base URL

export const fetchAllEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetchallevents`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEventsForFeed = async () => {
  try {
    const respone = await axios.get('https://h3et69o5hh.execute-api.us-east-1.amazonaws.com/api/events/fetchpaginatedevents?page=1&limit=3');

    return respone.data;
  } catch(error) {
    throw error;
  }
}