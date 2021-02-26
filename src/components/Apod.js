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
    const retrieve = async () => {
      const searchDate = await format(new Date(startDate), 'yyyy-MM-dd');
      const query = `&date=${searchDate}`
      console.log(`effect query: ${query}`);
   
      getData(query);
    };
    retrieve()
  }, [startDate]);

  const getData = async query => {
    // TODO: ternary after apiKey for search or random.
    if (!query) {
      query = '';
    }
    try {
      const response = await getApod.get(`/apod?api_key=${apiKey}${query}`);
      console.log(response.data);
      await setApodData(response.data);

    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  // TODO: ternary to determine between image and video.

  const handleSelectDate = date => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    console.log(`You selected the date: ${formattedDate}`);
    const query = `&date=${formattedDate}`;
    getData(query);
  };

  const handleRandom = () => {
    console.log('you want a random pic');
    //TODO: query will contain count = 1
    const query = `&count=1`;
    getData(query);
  };

  const displayDate = () => {
    if (!apodData) {
      return 'date goes here';
    }
    const formattedDate = dayjs(apodData.date).format('MMM. DD, YYYY');
    return formattedDate;
  };

  // TODO: call for data, random pic.
  const renderMedia = () => {
    if (!apodData) {
      return <div></div>;
    } else if (apodData.media_type === 'video') {
      //render iframe w/ video

      console.log('video');
      return <div>viddy here</div>
    } else {
      //render traditional image
      console.log('image');
      return <img src={apodData.url} alt={apodData.title} />;
    }
  };

  return (
    <div className='apod'>
      <DatePicker
        selected={startDate}
        maxDate={new Date()}
        onChange={date => setStartDate(date)}
        minDate={new Date(1995, 6, 20)}
        // onSelect={handleSelectDate(startDate)}
      />
      <Button variant='outline-success'onClick={handleRandom}>Random Date</Button>
      <Button variant='outline-info' >
        Search NASA Image Library
      </Button>

      <div>{displayDate()}</div>
      <div>{apodData.title}</div>

      <div>{renderMedia()}</div>
      <div>{apodData.explanation}</div>
    </div>
  );
};

export default Apod;
