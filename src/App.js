import React, { useState, useEffect } from 'react';
import Home from './pages/Home'
import Register from './pages/Register'
import  { DndProvider }   from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css';

function App() {

  const [createTeam, setCreateTeam] = useState(true);

  const [squads, setSquads] = useState([
    { id: 1, name: 'Barcelona', description: 'Barcelona Squad' },
    { id: 2, name: 'Real Madrid', description: 'Real Madrid Squad' },
    { id: 3, name: 'Milan', description: 'Milan Squad' },
    { id: 4, name: 'Liverpool', description: 'Liverpool Squad' },
    { id: 5, name: 'Lazio', description: 'Lazio Squad' }
  ]);

  function deleteSquad(id) {
    let list = squads.filter( team => team.id !== id);
    setSquads(list);
    console.log('squads', squads)
  }

  function createMode(bool) {
    setCreateTeam(bool)
  }

  function saveSquad(team) {
    console.log('save', team)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      
      {!createTeam &&
        <Home 
          squads={squads} 
          deleteSquad={deleteSquad} 
          createMode={createMode}/>
      }

      {createTeam &&
        <Register 
          createMode={createMode} 
          saveSquad={saveSquad}/>
      }

    </DndProvider>
  );
}

export default App;
