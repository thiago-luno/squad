import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import  { DndProvider }   from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import produce from 'immer';

import './App.css';

function App() {

  const [createTeam, setCreateTeam] = useState(true);
  const [squads, setSquads] = useState([])

  useEffect(() => {
    setSquads(squads)
  },[squads])


  function editSquad(id) {

  }

  function createMode(bool) {
    setCreateTeam(bool);
  }

  function insertSquad(squad) {
    squad.id = squads.length ? squads[squads.length - 1].id + 1 : 1
    setSquads(produce(draft => {
      draft.push(squad);
    }))

    setCreateTeam(false);

  }

  
  function saveSquad(team) {
    console.log('save', team)
  }

  return (
    <div>
        <Home 
          squads={squads} 
          createMode={createMode}/>
  

      {/* {createTeam &&
        <Register 
          createMode={createMode} 
          insertSquad={insertSquad}
          saveSquad={saveSquad}/>
      } */}

    </div>
  );
}

export default App;
