//Axios calls

import axios from 'axios';

// TODO: add api key to baseURL;

export default axios.create({
  baseURL: `https://api.nasa.gov/planetary/apod?api_key=`,
});
