//Home landing page

//Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

//components
import Button from 'react-bootstrap/Button';

// Styles
import '../css/home.css';

const Home = () => {
  return (
    <div className='home'>
      <div className='intro-content'>
        <h1 className='intro-quote font-weight-light'>
          Somewhere, something incredible is waiting to be known.
        </h1>
        <h2 className='intro-quote-attribution font-weight-light font-italic'>
          - Carl Sagan
        </h2>
        <Link to={`apod/${`today`}`} className='intro-button my-5'>
          <Button variant='info' size='lg'>
            Blast Off
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
