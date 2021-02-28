// Displays apod image for
import React, { useState, useEffect } from 'react';

//Componenets
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

//Helper functions
import fetchApod from '../axios/fetchApod';
import { format } from 'date-fns';
import dayjs from 'dayjs';

//Styles
import 'react-datepicker/dist/react-datepicker.css';

//TODO: update url based on date.

const Apod = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [apodData, setApodData] = useState({});

  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchApod();
      setApodData(result);
      setStartDate(new Date());
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
    const result = await fetchApod(queryDate);
    history.push(`/apod/${formattedDate}`);
    setApodData(result);
  };

  const handleRandom = async () => {
    const queryRandom = {
      params: {
        count: 1,
      },
    };
    const result = await fetchApod(queryRandom);

    //TODO: push to apod/date/${date}
    setStartDate(new Date(result[0].date));
    setApodData(result[0]);
  };

  const handleToday = async () => {
    const result = await fetchApod();
    setStartDate(new Date());
    //TODO: push to apod/today
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
      return (
        <iframe
          src={apodData.url}
          title={apodData.title}
          allowFullScreen={true}
          border='1px solid white'
        />
      );
    } else {
      //render image
      return <img src={apodData.url} alt={apodData.title} />;
    }
  };

  return (
    <div className='apod'>
      <h1>NASA Astronomy Picture of the Day</h1>
      <div>
        <DatePicker
          selected={startDate}
          maxDate={new Date()}
          onChange={date => setStartDate(date)}
          minDate={new Date(1995, 6, 20)}
          onSelect={date => handleSelectDate(date)}
        />
      </div>

      <Button variant='outline-success' onClick={handleRandom}>
        Random Picture
      </Button>
      <Button variant='outline-warning' onClick={handleToday}>
        Today's Picture
      </Button>
      <Link to='/search'>
        <Button variant='outline-info'>Search NASA Image Library</Button>
      </Link>
      <div>{displayDate()}</div>
      <div>{apodData.title}</div>
      <div>{renderMedia()}</div>
      <div>{apodData.explanation}</div>
    </div>
  );
};

export default Apod;
