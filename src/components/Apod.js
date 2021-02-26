// Displays apod image for
import React, { useState, useEffect } from 'react';

//Componenets
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

//Helper functions
import getApod from '../axios/axios';
import { format } from 'date-fns';
import dayjs from 'dayjs';

//Styles
import 'react-datepicker/dist/react-datepicker.css';

// import axios from './axios/axios'
const apiKey = process.env.REACT_APP_NASA_KEY;

const Apod = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [apodData, setApodData] = useState({});
  const [imageType, setImageType] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async query => {
    // TODO: ternary after apiKey for search or random.
    const response = await getApod.get(`/apod?api_key=${apiKey}`);
    console.log(response.data);
    setApodData(response.data);
  };

  // TODO: ternary to determine between image and video.

  const handleSelectDate = date => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');

    console.log(`You selected the date: ${formattedDate}`);

    // const reformatDate = format(new Date(formattedDate), 'MMMM dd, yyyy');
    // console.log(reformatDate);
    // TODO: call for getData w/ search parameters - YYYY-MM-DD
  };

  const displayDate = () => {
    if (!apodData) {
      return 'date goes here';
    }
    const formattedDate = dayjs(apodData.date).format('MMM. DD, YYYY');
    return formattedDate;
  };

  // TODO: call for data, random pic.

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

      <div>{displayDate()}</div>
      <div>{apodData.title}</div>

      <div>
        <img src={apodData.url} alt={apodData.title} />
      </div>
      <div>{apodData.explanation}</div>
    </div>
  );
};

export default Apod;
