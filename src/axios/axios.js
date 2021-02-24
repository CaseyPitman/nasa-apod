//Axios calls

import axios from 'axios';


export default axios.create({
  baseURL: `https://api.nasa.gov/planetary/`,
});
