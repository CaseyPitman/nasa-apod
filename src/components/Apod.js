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

    getData();
  }, []);

  

  // TODO: ternary to determine between image and video.

  const handleSelectDate = date => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    console.log(`You selected the date: ${formattedDate}`);
    const query = `&date=${formattedDate}`;
    getData(query, 'date');
  };

  const handleRandom = () => {
    console.log('you want a random pic');
    //TODO: query will contain count = 1
    const query = `&count=1`;
    getData(query, 'random');
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
      return <div>viddy here</div>;
    } else {
      //render traditional image
      console.log('image');
      return <img src={apodData.url} alt={apodData.title} />;
    }
  };

/* 
Try this:  
Move getData to helper func. in the component
have event funcs for selecting a date -onSelect (and this should call by default on first load, but maybe not, in which case go with useEffect) and random. In those event funcs do all the prep. format any dates for the call and assemble a params object. Pass that to the getData helper func. save the return to a variable and then manipulate it as needed - format, set the new startDate to properly fill in the serch field, whatever - before setting it as the apodData state. This should trigger the render. In theory. I hope. 
*/



  return (
    <div className='apod'>
      <DatePicker
        selected={startDate}
        maxDate={new Date()}
        onChange={date => setStartDate(date)}
        minDate={new Date(1995, 6, 20)}
        onSelect={() => handleSelectDate(startDate)}
      />

      <Button variant='outline-success' onClick={handleRandom}>
        Random Date
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
