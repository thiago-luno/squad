import React from 'react';
import ReactDOM from 'react-dom';
import  { DndProvider }   from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import './index.css';

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={App} />
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  </DndProvider>,
  document.getElementById('root')
);
