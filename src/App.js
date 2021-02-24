import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import Home from './components/Home';
import Apod from './components/Apod';

//Styles
import 'bootswatch/dist/cyborg/bootstrap.min.css';

// import axios from './axios/axios'
// const apiKey = process.env.REACT_APP_NASA_KEY;


function App() {

// const getData = async () => {

//   const response =  await axios.get(`/apod?api_key=${apiKey}`);
//   console.log(response.data)
// }

// useEffect(() => {
// getData()
// },[] )


  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/apod'>
            <Apod />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
