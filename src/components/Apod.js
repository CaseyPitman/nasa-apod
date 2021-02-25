// Displays apod image for
import React, { useState, useEffect } from 'react';

//Componenets
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

//Helper functions
import getApod from '../axios/axios';

//Styles
import 'react-datepicker/dist/react-datepicker.css';

// import axios from './axios/axios'
const apiKey = process.env.REACT_APP_NASA_KEY;

//random pic? button
//display searched pic
//display pic and info

const Apod = () => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getApod.get(`/apod?api_key=${apiKey}`);
    console.log(response.data);
  };

  const handleSelectDate = date => {
    console.log(`You selected the date: ${date}`);
  };

  return (
    <div className='apod'>
      <DatePicker
        selected={startDate}
        maxDate={new Date()}
        onChange={date => setStartDate(date)}
        minDate={new Date(1995, 6, 20)}
        onSelect={handleSelectDate(startDate)}
      />
      <Button variant='outline-success'>Random Date</Button>
    </div>
  );
};

export default Apod;
