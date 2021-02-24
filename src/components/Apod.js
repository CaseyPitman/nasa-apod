// Displays apod image for
import React, { useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//random pic?
//display pic and info


// TODO: limit datepicker to dates before 1995-06-16 (error handling for response?)

const Apod = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='apod'>
      <DatePicker
        selected={startDate}
        maxDate={new Date()}
        onChange={date => setStartDate(date)}
      />
      {/* <h1>APOD</h1>; */}
    </div>
  );
};

export default Apod;
