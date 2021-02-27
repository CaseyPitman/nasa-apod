import getApod from './axios';
const apiKey = process.env.REACT_APP_NASA_KEY;

const getData = async (query = {}) => {
  try {
    const response = await getApod.get(`/apod?api_key=${apiKey}`, query);
    return response.data;
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

export default getData;
