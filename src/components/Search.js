// This component will allow users to search the NASA image library.

import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Search = () => {
  return (
    <div>
      <h1>Search Page</h1>
      <Link to='/apod'>
        <Button variant='outline-info'>Back to Picture of the Day</Button>
      </Link>
      <Form>
        <InputGroup>
          <Form.Control
            placeholder='Saturn'
            aria-label='Search Term'
            aria-describedby='basic-addon2'
          />
          <InputGroup.Append>
            <Button variant='outline-success' type='submit'>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Search;
