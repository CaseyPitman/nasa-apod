// This component displays the astronomy picture of the day from NASA api

//Dependencies
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

//Components
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
  //Store currently displayed date and returned data.
  const [startDate, setStartDate] = useState(new Date());
  const [apodData, setApodData] = useState({});
  //Access history object
  const history = useHistory();

  //Display today's APOD on load
  useEffect(() => {
    handleToday();
    const fetch = async () => {
      const result = await fetchApod();
      setApodData(result);
      setStartDate(new Date());
    };
    fetch();
  }, []);

  //Handle user selecting a date other than today's date.
  const handleSelectDate = async date => {
    //Format the date for query.
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const queryDate = {
      params: {
        date: formattedDate,
      },
    };
    const result = await fetchApod(queryDate);
    //Update url based on selected date
    history.push(`/apod/${formattedDate}`);
    setApodData(result);
  };

  //Handle user requesting random date APOD
  const handleRandom = async () => {
    //Limit to ONE random pic (default is 10)
    const queryRandom = {
      params: {
        count: 1,
      },
    };
    const result = await fetchApod(queryRandom);
    //Format date
    const formattedDate = format(new Date(result[0].date), 'yyyy-MM-dd');
    //Update url to current date
    history.push(`/apod/${formattedDate}`);
    setStartDate(new Date(result[0].date));
    setApodData(result[0]);
  };

  //Handle user requesting to return to current day's date.
  const handleToday = async () => {
    const result = await fetchApod();
    setStartDate(new Date());
    //Update url to current date
    history.push(`/apod/today`);
    setApodData(result);
  };

  //Format and display the date in human friendly terminology
  const displayDate = () => {
    if (!apodData) {
      return <div></div>;
    }
    const formattedDate = dayjs(apodData.date).format('MMMM DD, YYYY');
    return formattedDate;
  };

  //Displays the image or video requested.
  const renderMedia = () => {
    if (!apodData) {
      return <div></div>;
    }
    //Render video
    else if (apodData.media_type === 'video') {
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
      //Render image
      return (
        <img src={apodData.url} alt={apodData.title} className='media-image' />
      );
    }
  };

  return (
    <div className='apod'>
      <div className='header'>
        <div className='headline-container'>
          <div className='logo-container'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg'
              alt='NASA logo'
              className='nasa-logo'
            />
          </div>
          <h1 className='headline'>
            Astronomy Picture <br></br>of the Day
          </h1>
        </div>
        <Link to='/search' className='header-btn-container'>
          <Button variant='info' className='search-btn' size='sm'>
            Search the full NASA Image Library
          </Button>
        </Link>
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
