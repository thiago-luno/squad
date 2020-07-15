import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import ServiceApi from "../../services/api";
import LabelPlayer from './LabelPlayer';
import Field from './Field';
import _ from "lodash";
import produce from 'immer'
import './styles.css'

export default function Squad(props) {

    const { createMode, saveSquad } = props;

    const [listPlayers, setListPlayers] = useState([]);
    const [formation, setFormation] = useState([]);

    const [droppedPlayers, setDroppedPlayers] = useState([
        {id: '1', value: null, position: 'gk'},
        {id: '2', value: null, position: null},
        {id: '3', value: null, position: null},
        {id: '4', value: null, position: null},
        {id: '5', value: null, position: null},
        {id: '6', value: null, position: null},
        {id: '7', value: null, position: null},
        {id: '8', value: null, position: null},
        {id: '9', value: null, position: null},
        {id: '10', value: null, position: null},
        {id: '11', value: null, position: null}
    ])

    function changeFormation(formation) {
        
        const lines = getLines(formation);
      

        console.log('lines :>> ', lines);
        
        let position = [];

        for(let x = 1; x <= lines.defense; x++) {
            position[x] = "deffense";
        }

        for(let x = 1; x <= lines.middle; x++) {
            position[x + parseInt(lines.defense)] = "middle";
        }

        if(lines.middleAttack) {
            for(let x = 1; x <= lines.middleAttack; x++) {
                console.log('middleAttack', x)
                setDroppedPlayers(produce(droppedPlayers, draft => {
                    draft[x + parseInt(lines.middle)].position = "middleAttack";
                }))
                position[x + parseInt(lines.middle)] = "middleAttack";
            }

            for(let x = 1; x <= lines.attack; x++) {
                console.log('attack', x)
                setDroppedPlayers(produce(droppedPlayers, draft => {
                    draft[x + parseInt(lines.middleAttack)].position = "attack";
                }))

                position[x + parseInt(lines.middleAttack)] = "attack";
                
            }
        } else {
            for(let x = 1; x <= lines.attack; x++) {
                position[x + (parseInt(lines.middle) + parseInt(lines.defense))] = "attack";
            }
        }

        setDroppedPlayers(produce(droppedPlayers, draft => {
            for(const index in position) {
                console.log('index :>> ', index);
                console.log('droppedPlayers :>> ', droppedPlayers[index]);
                draft[index].position = position[index];

            }
        }))
        
        console.log('droppedPlayers :>> ',  droppedPlayers);
    }

    function getLines(formation) {
        const lines = formation.split('-');

        let defense;
        let middle;
        let middleAttack;
        let attack;

        if(lines.length < 4) {
            defense = lines[0];
            middle = lines[1];
            attack = lines[2]

        } else {
            defense = lines[0];
            middle = lines[1];
            middleAttack = lines[2]
            attack = lines[3]
        }

        let squadFormation = { defense, middle, middleAttack, attack }

        if(!squadFormation.middleAttack)
            delete squadFormation.middleAttack

        return squadFormation
    }

    const delayedQuery = _.debounce(q => searchPlayer(q), 300);

    async function searchPlayer(name) {
        const response = await ServiceApi.getPlayer(name);
        setListPlayers(response);
    }

    function onChange(e) {
        delayedQuery(e.target.value);
    }

    function insertPlayer(drag, drop) {
        setDroppedPlayers(produce(droppedPlayers, draft => {
            let index = drop.id - 1;
            draft[index].value = nameInitials(drag.player.strPlayer);
        }))
    }

    function nameInitials(name) {
        let str = name.split(" ")

        if(str.length === 1) {
            let initital = str[0][0];

            if(str[0][1])
                initital += str[0][1]
            if(str[0][2])
                initital += str[0][2]

            return  initital

        } else {
            return `${str[0][0].toUpperCase()} ${str[str.length-1][0].toUpperCase()}`
        }
    }

    return (

            <Grid container>
                <Grid item xs={12}>
                    <h3 className="teamInfo__title">Configure Squad</h3>
                </Grid>

                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="" style={{ "marginRight": "30px" }}>Formation </label>

                            <Field 
                                changeFormation={changeFormation}
                                droppedPlayers={droppedPlayers} 
                                onDrop={insertPlayer} />

                        </div>

                        <button className="btn-save">Save</button>
                    </Grid>

                    <Grid item xs={6}>
                        <div className="form-group">
                            <label className="form-label no-mt" htmlFor="">Search Players</label>
                            <input type="text" placdeholer="Insert team name" onChange={onChange} />
                        </div>
                        <div className="content-list-players">
                            {listPlayers && listPlayers.map(
                                player => <LabelPlayer key={player.idPlayer} player={player} />
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Grid>


    )
}
