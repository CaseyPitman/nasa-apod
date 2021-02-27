// This component will allow users to search the NASA image library.

import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Button from 'react-bootstrap/Button';

const Search = () => {
  return (
    <div>
      <h1>Search Page</h1>
      <Link to='/apod'>
        <Button variant='outline-info'>Back to Picture of the Day</Button>
      </Link>
      
    </div>
  );
};

export default Search;
