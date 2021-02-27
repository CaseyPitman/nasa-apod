

import axios from 'axios';

const apiKey = process.env.REACT_APP_NASA_KEY;

const fetchApod= async (query = {}) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, query);
    return response.data;
  } catch (err) {
    //TODO: add error handling
    console.log(`error: ${err}`);
  }
};

export default fetchApod;
