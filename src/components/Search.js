// This component will allow users to search the NASA image library.

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';

//Helper functions
import fetchSearch from '../axios/fetchSearch';

//Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';

//styles
import '../css/search.css';

Modal.setAppElement(`#root`);

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({});

  const history = useHistory();

  useEffect(() => {
    history.push('/search/');
  }, [history]);

  const handleSubmit = async e => {
    e.preventDefault();
    const query = {
      params: {
        q: searchTerm,
        media_type: 'image',
        page: searchPage,
      },
    };
    const result = await fetchSearch(query);
    console.log(result);
<<<<<<< HEAD

=======
>>>>>>> pagination
    history.push(`/search/${searchTerm}/page=${searchPage}`);
    setSearchResults(result);

    setTotalHits(result.metadata.total_hits);
    setTotalPages(Math.ceil(result.metadata.total_hits / 100));
  };

  const changePage = dir => {
    console.log(`you wish to go to ${dir} page`);
    //set cur page
    //make call for next or previous
    //set results to re-render
  };

  //TODO: enable pagination controls
  //TODO: add popover w/ title for each image.
  //FIXME: when closing modal, don't reset to top of page.
  //FIXME: when reloading page reset url.
  //FIXME: pagination should only show when results exist.

  const renderResults = () => {
    if (searchResults.length === 0) {
      return <div></div>;
    }
    if (totalHits < 1) {
      return <div>No result</div>;
    }
    const thumbnails = searchResults.items.map(image => {
      return (
        <div
          key={image.data[0].nasa_id}
          onClick={() => openModal(image)}
          className='grid-item'>
          <img
            src={image.links[0].href}
            alt={image.data[0].title}
            className='grid-item-thumbnail'
          />
          {/* <p className='grid-item-title'>{image.data[0].title}</p> */}
        </div>
      );
    });
    return thumbnails;
  };

  const renderPagination = () => {
    if (totalPages === 0) {
      return <div></div>;
    }

    return (
      <Pagination className='pagination'>
        <Pagination.Prev onClick={() => changePage('prev')} />
        <p className='pagination-page-count'>
          Page {searchPage} of {totalPages}
        </p>
        <Pagination.Next onClick={() => changePage('next')} />
      </Pagination>
    );
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
        <Button size='sm' variant='outline-danger' onClick={closeModal}>
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

<<<<<<< HEAD
  //TODO: dynamically render pagination based on number of results. Complex w/ ellipses?
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i < 5; i++) {
      pages.push(
        <Pagination.Item key={i} active={searchPage === i}>
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

=======
>>>>>>> pagination
  return (
    <div>
      <h1>Search Page</h1>
      <Link to='/apod/today'>
        <Button variant='info'>Back to Picture of the Day</Button>
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
<<<<<<< HEAD
      <div className='page-buttons'>
        <Pagination>
          {' '}
          <Pagination.First />
          <Pagination.Prev />
          {renderPagination()}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
=======
      {renderPagination()}
>>>>>>> pagination
      <div className='search-results grid-container'>{renderResults()}</div>
      {renderPagination()}
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
