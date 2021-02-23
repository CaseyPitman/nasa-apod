import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import Home from './components/Home';
import Apod from './components/Apod';

//Styles
import 'bootswatch/dist/cyborg/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/apod'>
            <Apod />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
