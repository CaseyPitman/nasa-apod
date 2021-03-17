//This component displays an error message. This

import React from 'react';

import hal from '../images/hal.jpg';

import '../css/error.css';

const Error = ({ msg = 'Something seems to be wrong.' }) => {
  return (
    <div className='error-container'>
      <p className='error-message'>
        I'm sorry Dave.<br></br> I'm afraid I can't do that. <br></br>
        <img src={hal} alt='Hal9000' className='error-image' />
        {msg}
      </p>
    </div>
  );
};

export default Error;
