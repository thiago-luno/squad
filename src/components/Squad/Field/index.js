import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import  Player  from '../Player';

export default function Field(props) {

    const { changeFormation, droppedPlayers, onDrop } = props;
    const [gk, setGk] = useState([]);
    const [defense, setDefense] = useState([]);
    const [middle, setMiddle] = useState([]);
    const [middleAttack, setMiddleAttack] = useState([]);
    const [attack, setAttack] = useState([]);
    const [selectFormation, setSelectFormation] = useState([]); 

    useEffect(() => { 
        temp();
    }, [droppedPlayers])

    useEffect(() => {
        setSelectFormation(selectFormation);
    },[])

    useEffect(() => {
        setSelectFormation(selectFormation);
    },[selectFormation])

    function temp() {
        let gk = droppedPlayers.filter(player => player.position === 'gk');
        let defense = droppedPlayers.filter(player => player.position === 'deffense');
        let middle = droppedPlayers.filter(player => player.position === 'middle');
        let middleAttack = droppedPlayers.filter(player => player.position === 'middleAttack');
        let attack = droppedPlayers.filter(player => player.position === 'attack');
        
        setGk(gk);
        setDefense(defense);
        setMiddle(middle);
        setMiddleAttack(middleAttack);
        setAttack(attack);
    }

    function handleChange(e) {
        setSelectFormation(e.target.value);
        changeFormation(e.target.value);
        temp();
    }

    return (
        <div>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectFormation}
                onChange={handleChange}
                className="select-formation">

                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="3-2-2-3">3-2-2-3</MenuItem>
                <MenuItem value="3-4-3">3-4-3</MenuItem>
                <MenuItem value="3-5-2">3-5-2</MenuItem>
                <MenuItem value="4-2-3-1">4-2-3-1</MenuItem>
                <MenuItem value="4-3-1-2">4-3-1-2</MenuItem>
                <MenuItem value="4-4-2">4-4-2</MenuItem>
                <MenuItem value="5-4-1">5-4-1</MenuItem>
            </Select>

            <div className="field-large f4-4-2 mt-20">
                <div className="lines line-attack">
                    { attack.map((player, index) => 
                                <Player
                                key={index}
                                index={index}
                                onDrop={onDrop}
                                player={player} />
                    )}
                </div>

                {middleAttack.length > 0 &&
                    <div className="lines line-middleAttack">
                        { middleAttack.map((player, index) => 
                                <Player
                                key={index}
                                index={index}
                                onDrop={onDrop}
                                player={player} />
                        )}
                    </div>
                }

                <div className="lines line-middle">
                    { middle.map((player, index) => 
                                <Player
                                key={index}
                                index={index}
                                onDrop={onDrop}
                                player={player} />
                    )}
                </div>

                <div className="lines line-defense">
                    { defense.map((player, index) => 
                                <Player
                                key={index}
                                index={index}
                                onDrop={onDrop}
                                player={player} />
                    )}
                </div>

                <div className="lines line-gk">
                    { gk.map((player, index) => 
                                <Player
                                key={index}
                                index={index}
                                onDrop={onDrop}
                                player={player} />
                    )}
                </div>

                <div className="field__marks-large">
                    <div className="field__line-large"></div>
                    <div className="field__circle-large"></div>
                </div>
            </div>
        </div>
    )
}
