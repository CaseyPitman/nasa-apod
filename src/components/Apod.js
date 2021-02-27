// Displays apod image for
import React, { useState, useEffect } from 'react';

//Componenets
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

//Helper functions
import getData from '../axios/getData';
import { format } from 'date-fns';
import dayjs from 'dayjs';

//Styles
import 'react-datepicker/dist/react-datepicker.css';

const Apod = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [apodData, setApodData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const result = await getData();
      setApodData(result);
    };
    fetch();
  }, []);

  const handleSelectDate = async date => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const queryDate = {
      params: {
        date: formattedDate,
      },
    };
    const result = await getData(queryDate);
    console.log(result);

    setApodData(result);
  };

  const handleRandom = async () => {
    const queryRandom = {
      params: {
        count: 1,
      },
    };
    const result = await getData(queryRandom);

    setStartDate(new Date(result[0].date));
    setApodData(result[0]);
  };

  const handleToday = async () => {
    console.log('go back to today');
    const result = await getData();
    setStartDate(new Date());
    setApodData(result);
  };

  const displayDate = () => {
    if (!apodData) {
      return 'date goes here';
    }
    const formattedDate = dayjs(apodData.date).format('MMM. DD, YYYY');
    return formattedDate;
  };

  const renderMedia = () => {
    if (!apodData) {
      return <div></div>;
    } else if (apodData.media_type === 'video') {
      //render iframe w/ video

      console.log('video');
      return (
        <iframe
          src={apodData.url}
          title={apodData.title}
          allowFullScreen={true}
          border='1px solid white'
        />
      );
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
        onSelect={date => handleSelectDate(date)}
      />

      <Button variant='outline-success' onClick={handleRandom}>
        Random Pic
      </Button>
      <Button variant='outline-warning' onClick={handleToday}>
        Today's Pic{' '}
      </Button>
      <Button variant='outline-info'>Search NASA Image Library</Button>

      <div>{displayDate()}</div>
      <div>{apodData.title}</div>
      <div>{renderMedia()}</div>
      <div>{apodData.explanation}</div>
    </div>
  );
};

export default Apod;
