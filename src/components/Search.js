// This component will allow users to search the NASA image library.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Helper functions
import fetchSearch from '../axios/fetchSearch';

//Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPage, setSearchPage] = useState(`1`);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(`submit: ${searchTerm}`);
    const query = {
      params: {
        q: searchTerm,
        media_type: 'image',
        page: searchPage,
      },
    };
    const result = await fetchSearch(query);
    console.log(result);
    setSearchResults(result);
  };

  //TODO: add pagination controls

  const renderResults = () => {
    if (searchResults.length === 0) {
      return <div></div>;
    }
    const thumbnails = searchResults.items.map(image => {
      return (
        <div key={image.data[0].nasa_id}>
          <img src={image.links[0].href} alt={image.data[0].title} />;
          <p>{image.data[0].title}</p>
        </div>
      );
    });

    return thumbnails;
  };

  return (
    <div>
      <h1>Search Page</h1>
      <Link to='/apod/today'>
        <Button variant='outline-info'>Back to Picture of the Day</Button>
      </Link>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            placeholder='Saturn'
            aria-label='Search Term'
            aria-describedby='basic-addon2'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant='outline-success' type='submit'>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <div className='search-results'>{renderResults()}</div>
    </div>
  );
};

export default Search;
