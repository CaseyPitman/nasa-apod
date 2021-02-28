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
import '../css/search.css';

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

  // const handleImageClick =  (image) => {
  //   console.log(image);
  //   openModal();
  // }

  const renderResults = () => {
    if (searchResults.length === 0) {
      return <div></div>;
    }
    if (!searchResults.links) {
      return <div>No result</div>;
    }
    const thumbnails = searchResults.items.map(image => {
      return (
        <div key={image.data[0].nasa_id} onClick={() => openModal(image)}>
          <img src={image.links[0].href} alt={image.data[0].title} />;
          <p>{image.data[0].title}</p>
        </div>
      );
    });
    return thumbnails;
  };

  //MODAL FUNCS
  // Open modal
  const openModal = image => {
    setCurrentImage(image);
    setModalIsOpen(true);
  };
  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const renderModalContent = () => {
    // No data present yet, render empty div.
    if (!currentImage.data) {
      return <div></div>;
    }
    return (
      <div>
        <Button size='sm' variant='outline-danger'>
          Close
        </Button>
        <img
          src={currentImage.links[0].href}
          alt={currentImage.data[0].title}
        />
        <h2 className='text-dark'>{currentImage.data[0].title}</h2>
        {/* Display date of photo, if it exists */}
        {currentImage.data[0].date_created ? (
          <p>
            <strong>Date:</strong> {currentImage.data[0].date_created}
          </p>
        ) : (
          <div></div>
        )}
        {/* Display description if it exists && it is not identical to the title */}
        {currentImage.data[0].description &&
        currentImage.data[0].description !== currentImage.data[0].title ? (
          <p>
            <strong>Description:</strong> {currentImage.data[0].description}
          </p>
        ) : (
          <div></div>
        )}
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
            <Button
              variant='outline-success'
              type='submit'
              className='submit-search-button'>
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
