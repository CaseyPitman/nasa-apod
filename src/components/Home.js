//Home landing page

import React from 'react';

//components
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

// Styles
import '../css/home.css';

const Home = () => {
  return (
    <div className='home'>
      <h1>Somewhere, something incredible is waiting to be known.</h1>
      <h1>- Carl Sagan</h1>
      <Link to='apod'>
        <Button variant='outline-info' size='lg'>
          Blast Off
        </Button>
      </Link>
    </div>
  );
};

export default Home;
