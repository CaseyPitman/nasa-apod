//Axios calls

import axios from 'axios';


const getApod = axios.create({
  baseURL: `https://api.nasa.gov/planetary/`}
);

export default getApod;