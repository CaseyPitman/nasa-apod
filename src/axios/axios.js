//Axios calls

import axios from 'axios';

// TODO: add api key to baseURL;

const apiKey = process.env.REACT_APP_NASA_KEY;

export default axios.create({
  baseURL: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
});
