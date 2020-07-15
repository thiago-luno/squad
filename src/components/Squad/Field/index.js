import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import  Player  from '../Player';

export default function Field(props) {
    
    const { changeFormation, droppedPlayers, onDrop } = props;

    const [selectFormation, setSelectFormation] = useState([]); 

    function handleChange(e) {
        setSelectFormation(e.target.value);
        changeFormation(e.target.value);
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
                <MenuItem value="4-5-2">4-5-2</MenuItem>
                <MenuItem value="5-4-1">5-4-1</MenuItem>
            </Select>

            <div className="field-large f4-4-2 mt-20">
                {
                    droppedPlayers.map((player, index) =>
                        // if(index)
                        <Player
                            key={index}
                            index={index}
                            onDrop={onDrop}
                            player={player} />)
                }

                <div className="lines line-defense"></div>
                <div className="lines line-middle-attack"></div>
                <div className="lines line-middle"></div>
                {/* <div className="lines line-middle-defense"></div> */}
                <div className="lines line-defense"></div>
                <div className="lines line-gk"></div>

                <div className="field__marks-large">
                    <div className="field__line-large"></div>
                    <div className="field__circle-large"></div>
                </div>
            </div>

        </div>
    )
}
