//This component handles get requests for the NASA image archive search.

import axios from 'axios';

const fetchSearch = async (query = {}) => {
  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search`,
      query
    );
    console.log(response.data.collection);
    return response;
  } catch (err) {
    //TODO: add error handling
    console.log(err);
  }
};

export default fetchSearch;
