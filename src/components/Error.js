//This component displays an error message. This

import React from 'react';

import hal from '../images/hal.jpg';

const Error = ({ msg = 'Something seems to be wrong.' }) => {
  return (
    <div className='error-container'>
      <p className='error-message'>
        I'm sorry Dave. <br></br>I'm afraid I can't do that. <br></br>
        {msg}
      </p>
      <img src={hal} alt='Hal9000' className='no-result-image' />
    </div>
  );
};

export default Error;
