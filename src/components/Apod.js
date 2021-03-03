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
    handleToday();
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
    const formattedDate = dayjs(apodData.date).format('MMMM DD, YYYY');
    return formattedDate;
  };

  const renderMedia = () => {
    if (!apodData) {
      return <div></div>;
    } else if (apodData.media_type === 'video') {
      return (
        <div className='embed-responsive embed-responsive-16by9 media-video'>
          <iframe
            src={apodData.url}
            title={apodData.title}
            allowFullScreen={true}
            border='1px solid white'
            className='embed-responsive-item'
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
      <div className='apod-header'>
        <h1 className='apod-headline'>NASA Astronomy Picture of the Day</h1>
      </div>
      <div className='search-link-container'>
        <Link to='/search' className='search-btn-wrapper'>
          <Button variant='info' className='search-btn'>
            Search NASA Image Library
          </Button>
        </Link>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg'
          alt='NASA logo'
        />
      </div>

      <div className='apod-content-container'>
        <div className='apod-media-container'>{renderMedia()}</div>
        <div className='apod-display-text-container'>
          <div className='apod-actions-container'>
            <div className='apod-date-picker-wrapper'>
              <div className='apod-date-picker-container'>
                <DatePicker
                  selected={startDate}
                  maxDate={new Date()}
                  onChange={date => setStartDate(date)}
                  minDate={new Date(1995, 6, 20)}
                  onSelect={date => handleSelectDate(date)}
                  dateFormat={'MMMM dd, yyyy'}
       
                  className={`date-picker`}
                  name={'datePicker'}
                />
              </div>
            </div>
            <Button
              variant='success'
              onClick={handleToday}
              className='today-pic'
              size='sm'>
              Today's Picture
            </Button>
            <Button onClick={handleRandom} className='random-pic' size='sm'>
              Random Picture
            </Button>
          </div>
          <h5 className='apod-display-date'>
            <strong>{displayDate()}</strong>
          </h5>
          <h5 className='apod-display-title'>
            <strong>{apodData.title}</strong>
          </h5>
          <p className='apod-display-explanation'>{apodData.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default Apod;
