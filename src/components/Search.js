// This component will allow users to search the NASA image library.

import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import dayjs from 'dayjs';

//Helper functions
import fetchSearch from '../axios/fetchSearch';

//Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import Error from './Error';

//styles
import '../css/search.css';

//Anchor modal
Modal.setAppElement(`#root`);

const Search = () => {
  //Ref for scroll to top of Display on pagination click
  const myRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  //Access history object
  const history = useHistory();

  //Update url when history updates (on search).
  useEffect(() => {
    history.push('/search/');
  }, [history]);

  //User submits search request
  const handleSubmit = async e => {
    e.preventDefault();
    setSearchPage(1);

    const query = {
      params: {
        q: searchTerm,
        media_type: 'image',
        page: 1,
      },
    };

    const result = await fetchSearch(query);
    setSearchResults(result);
    //Update URL
    history.push(`/search/${searchTerm}/page=1`);
    setTotalHits(result.metadata.total_hits);
    setTotalPages(Math.ceil(result.metadata.total_hits / 100));
    //if result has a next page then set it
    if (result.links && result.links.length >= 1) {
      setNextPage(2);
      setPrevPage(0);
    }
  };

  //Change page of search results
  const changePage = async dir => {
    let goToPage = null;
    if (dir === 'next') {
      goToPage = nextPage;
    } else if (dir === 'prev') {
      goToPage = prevPage;
    }

    const query = {
      params: {
        q: searchTerm,
        media_type: 'image',
        page: goToPage,
      },
    };
    const result = await fetchSearch(query);
    setSearchResults(result);
    //Update URL
    history.push(
      `/search/${searchTerm}/page=${dir === 'next' ? nextPage : prevPage}`
    );
    //Scroll to top of page on page change
    executeScroll();
    //Set cur, next, and previous page
    setSearchPage(dir === 'next' ? nextPage : prevPage);
    const newNextPage = dir === 'next' ? nextPage + 1 : nextPage - 1;
    const newPrevPage = dir === 'next' ? prevPage + 1 : prevPage - 1;
    setNextPage(newNextPage);
    setPrevPage(newPrevPage);
  };

  //Render pagination controls
  const renderPagination = () => {
    if (totalPages === 0) {
      return <div></div>;
    }

    return (
      <Pagination className='pagination'>
        <Pagination.Prev
          onClick={() => changePage('prev')}
          className={searchPage === 1 ? 'disabled' : ''}
        />
        <p className='pagination-page-count'>
          Page {searchPage} of {totalPages}
        </p>
        <Pagination.Next
          onClick={() => changePage('next')}
          className={searchPage === totalPages ? 'disabled' : ''}
        />
      </Pagination>
    );
  };

  //Scrolls to top of Display on list page navigation
  const executeScroll = () => {
    myRef.current.scrollIntoView();
  };

  //Render search results
  const renderResults = () => {
    if (searchResults.length === 0) {
      return <div></div>;
    }
    //Search returns zero results
    if (totalHits < 1) {
      return (
        <Error
          msg={'I have no record of the information you have requested.'}
        />
      );
    }
    const thumbnails = searchResults.items.map(image => {
      return (
        <button
          key={image.data[0].nasa_id}
          onClick={() => openModal(image)}
          className='grid-item'
          data-toggle='tooltip'
          data-placement='top'
          title={image.data[0].title}>
          <img
            src={image.links[0].href}
            alt={image.data[0].title}
            className='grid-item-thumbnail'
          />
        </button>
      );
    });
    return <div className='search-results grid-container'>{thumbnails}</div>;
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

  //Render modal content
  const renderModalContent = () => {
    // No data present yet, render empty div.
    if (!currentImage.data) {
      return <div></div>;
    }
    return (
      <div className='modal-content-wrapper'>
        <div className='close-modal-btn-container'>
          <Button
            size='sm'
            variant='outline-danger'
            onClick={closeModal}
            className='close-modal-btn'
            aria-label='close'>
            Close
          </Button>
        </div>

        <div className='modal-content-container'>
          <img
            src={currentImage.links[0].href}
            alt={currentImage.data[0].title}
            className='modal-image'
          />
          <div className='modal-text-container'>
            <h2 className='text-dark modal-headline'>
              {currentImage.data[0].title}
            </h2>
            {/* Display date of photo, if it exists */}
            {currentImage.data[0].date_created ? (
              <p>
                <strong>Date:</strong>{' '}
                {dayjs(currentImage.data[0].date_created).format(
                  'MMMM DD, YYYY'
                )}
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
        </div>
      </div>
    );
  };

  return (
    <div className='search' ref={myRef}>
      <div className='header'>
        <div className='headline-container'>
          <div className='logo-container'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg'
              alt='NASA logo'
              className='nasa-logo'
            />
          </div>

          <h1 className='headline'>Image Archive</h1>
        </div>

        <Link to='/apod/today' className='header-btn-container'>
          <Button variant='info' size='sm'>
            Back to Picture of the Day
          </Button>
        </Link>
      </div>

      <Form onSubmit={handleSubmit} className='search-bar'>
        <InputGroup>
          <Form.Control
            placeholder='Search the NASA image archives'
            aria-label='Search Term'
            aria-describedby='basic-addon2'
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
          />
          <InputGroup.Append>
            <Button
              variant='info'
              type='submit'
              className='submit-search-button'>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {renderPagination()}
      {renderResults()}
      {renderPagination()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='modal-content-window'>
        <div>{renderModalContent()}</div>
      </Modal>
    </div>
  );
};

export default Search;
