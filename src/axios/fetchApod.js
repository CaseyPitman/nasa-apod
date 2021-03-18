//This function fetches the astronomy picture of the day from NASA.


import axios from 'axios';
//API KEY
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
