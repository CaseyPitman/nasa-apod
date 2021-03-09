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
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
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
    setSearchPage(1);

    const query = {
      params: {
        q: searchTerm,
        media_type: 'image',
        page: 1,
      },
    };
    const result = await fetchSearch(query);
    console.log(result);
    setSearchResults(result);
    history.push(`/search/${searchTerm}/page=1`);
    setTotalHits(result.metadata.total_hits);
    setTotalPages(Math.ceil(result.metadata.total_hits / 100));
    //if result has a next page then set it
    if (result.links && result.links.length >= 1) {
      setNextPage(2);
      setPrevPage(0);
    }
  };

  const changePage = async dir => {
    console.log(`you wish to go to ${dir} page: ${nextPage}`);

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
    console.log(result);
    setSearchResults(result);
    history.push(
      `/search/${searchTerm}/page=${dir === 'next' ? nextPage : prevPage}`
    );

    setSearchPage(dir === 'next' ? nextPage : prevPage);
    const newNextPage = dir === 'next' ? nextPage + 1 : nextPage - 1;
    const newPrevPage = dir === 'next' ? prevPage + 1 : prevPage - 1;
    setNextPage(newNextPage);
    setPrevPage(newPrevPage);

    console.log(searchPage);
  };

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


  //TODO: modal styles
  //FIXME: when closing modal, don't reset to top of page.

  const renderResults = () => {
    if (searchResults.length === 0) {
      return <div></div>;
    }
    if (totalHits < 1) {
      return <div>No result</div>;
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
          {/* <p className='grid-item-title'>{image.data[0].title}</p> */}
        </button>
      );
    });
    return thumbnails;
  };

  //MODAL FUNCS
  // Open modal
  const openModal = (image )=> {
   
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
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
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
      {renderPagination()}
      <div className='search-results grid-container'>{renderResults()}</div>
      {renderPagination()}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div>{renderModalContent()}</div>
      </Modal>
    </div>
  );
};

export default Search;
