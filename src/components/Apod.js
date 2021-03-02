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
import '../css/apod.css';


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
    const formattedDate = format(new Date(result[0].date), 'yyyy-MM-dd');

    history.push(`/apod/${formattedDate}`);
    setStartDate(new Date(result[0].date));
    setApodData(result[0]);
  };

  const handleToday = async () => {
    const result = await fetchApod();
    setStartDate(new Date());
    history.push(`/apod/today`);
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
        <div className='embed-responsive embed-responsive-16by9'>
          <iframe
            src={apodData.url}
            title={apodData.title}
            allowFullScreen={true}
            border='1px solid white'
            className='media-video embed-responsive-item'
          />
        </div>
      );
    } else {
      //render image
      return (
        <img src={apodData.url} alt={apodData.title} className='media-image' />
      );
    }
  };

  // TODO: loading spinner for images.

  return (
    <div className='apod'>
      <h1>NASA Astronomy Picture of the Day</h1>
      <div className='apod-actions-container'>
        <div className='apod-date-picker-container'>
          <label htmlFor='datePicker'>Search a Date</label>
          <br></br>
          <DatePicker
            selected={startDate}
            maxDate={new Date()}
            onChange={date => setStartDate(date)}
            minDate={new Date(1995, 6, 20)}
            onSelect={date => handleSelectDate(date)}
            name={`datePicker`}
          />
        </div>
        <Button variant='outline-success' onClick={handleRandom}>
          Random Picture
        </Button>
        <Button variant='outline-warning' onClick={handleToday}>
          Today's Picture
        </Button>{' '}
        <Link to='/search' className='search-button'>
          <Button variant='outline-info'>Search NASA Image Library</Button>
        </Link>
      </div>

      <div className='apod-content-container my-5'>
        <div className='apod-media-container'>{renderMedia()}</div>
        <div className='apod-display-text-container'>
          <p className='apod-display-date'>
            <strong>{displayDate()}</strong>
          </p>
          <p className='apod-display-title'>
            <strong>{apodData.title}</strong>
          </p>
          <p className='apod-display-explanation'>{apodData.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default Apod;
