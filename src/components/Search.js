// This component will allow users to search the NASA image library.

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';

//Helper functions
import fetchSearch from '../axios/fetchSearch';

//Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

//styles
import "../css/search.css"

Modal.setAppElement(`#root`);

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPage, setSearchPage] = useState(`1`);
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({});

  const history = useHistory();

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

    history.push(`/search/${searchTerm}/page=${searchPage}`);
    setSearchResults(result);
  };

  //TODO: add pagination controls
  //TODO: add modal view of full size image w/ title, description and photgrapher if available.

  const renderResults = () => {
    if (searchResults.length === 0) {
      return <div></div>;
    }
    if (!searchResults.links) {
      return <div>No result</div>;
    }
    const thumbnails = searchResults.items.map(image => {
      return (
        <div key={image.data[0].nasa_id} onClick={openModal}>
          <img src={image.links[0].href} alt={image.data[0].title} />;
          <p>{image.data[0].title}</p>
        </div>
      );
    });
    return thumbnails;
  };

  //MODAL FUNCS
  // Open modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const renderModalContent = () => {
    return (
      <div>
        <p>image</p>
        <h2 className='text-dark'>Title</h2>
        <p>photographer</p>
        <p>explanation</p>
      </div>
    );
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
            placeholder='Search the NASA image archives'
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        preventScroll={false}>
        <div>{renderModalContent()}</div>
      </Modal>
    </div>
  );
};

export default Search;
