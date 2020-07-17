import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import ServiceApi from "../../services/api";
import LabelPlayer from './LabelPlayer';
import Field from './Field';
import _ from "lodash";
import produce from 'immer';
import Api from "../../services/api";
import './styles.css';

export default function Squad(props) {
    const { saveSquad, infoSquad } = props;
    const [ query, setQuery ] = useState('')
    const [listPlayers, setListPlayers] = useState([]);
    const [formation, setFormation] = useState('4-4-2');

    // formation 4-4-2
    const [droppedPlayers, setDroppedPlayers] = useState([
        {id: '1', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: 'gk'},
        {id: '2', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "deffense"},
        {id: '3', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "deffense"},
        {id: '4', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "deffense"},
        {id: '5', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "deffense"},
        {id: '6', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "middle"},
        {id: '7', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "middle"},
        {id: '8', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "middle"},
        {id: '9', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "middle"},
        {id: '10', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "attack"},
        {id: '11', value: null, born: null, team: null, nationality: null, weight: null, idPlayer: null, position: "attack"}
    ])

    useEffect(() => {

        if(infoSquad) {
            const team = Api.getSquadById(infoSquad);
            setDroppedPlayers(team.squad.squad);
            setFormation(team.squad.formation);
            return
        }
        setDroppedPlayers(droppedPlayers);
        setFormation('4-4-2');
    
    },[])

    useEffect(() => {
        searchPlayer(query)
        saveSquad(droppedPlayers, formation)
    },[droppedPlayers])

    useEffect(() => {
        saveSquad(droppedPlayers, formation)
    },[formation])

    function changeFormation(formation) {
        setFormation(formation);

        const lines = getLines(formation);   
        let position = [];
        position[0] = "gk";

        for(let x = 1; x <= lines.defense; x++) {
            position[x] = "deffense";
        }

        for(let x = 1; x <= lines.middle; x++) {
            position[x + parseInt(lines.defense)] = "middle";
        }

        if(lines.middleAttack) {
            for(let x = 1; x <= lines.middleAttack; x++) {
                position[x + parseInt(lines.middle) + parseInt(lines.defense)] = "middleAttack";
            }

            for(let x = 1; x <= lines.attack; x++) {
                position[x +  (parseInt(lines.middleAttack) + (parseInt(lines.middle) + parseInt(lines.defense)))] = "attack";
                
            }
        } else {
            for(let x = 1; x <= lines.attack; x++) {
                position[x + (parseInt(lines.middle) + parseInt(lines.defense))] = "attack";
            }
        }

        setDroppedPlayers(produce(droppedPlayers, drafts => {
            for(const index in position) {
                drafts[index].position = position[index];
                drafts[index].value = null; 
                drafts[index].born = null;
                drafts[index].team = null;
                drafts[index].nationality = null;
                drafts[index].weight = null;
                drafts[index].idPlayer = null;
            }
        })) 
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
        let response = await ServiceApi.getPlayer(name);
        if(droppedPlayers) {
            const idsPlayers =  droppedPlayers.map( player => player.idPlayer);
            response = response.filter((eachElem, index) => idsPlayers.indexOf(eachElem.idPlayer) == -1)

        }
        
        setListPlayers(response);
    }

    function onChange(e) {
        setQuery(e.target.value)
        delayedQuery(e.target.value);
    }

    function insertPlayer(drag, drop) {
        setDroppedPlayers(produce(droppedPlayers, draft => {
            let index = drop.id - 1;
            draft[index].idPlayer = drag.player.idPlayer;
            draft[index].value = drag.player.strPlayer;
            draft[index].team = drag.player.strTeam;
            draft[index].born = drag.player.dateBorn;
            draft[index].nationality = drag.player.strNationality;
            draft[index].weight = drag.player.strWeight;
        }))
    }

   
    return (
            <Grid container>
                <Grid item xs={12}>
                    <h3 className="teamInfo__title">Configure Squad</h3>
                </Grid>

                <Grid container spacing={10}>
                    <Grid item sm={6} xs={12}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="" style={{ "marginRight": "30px" }}>Formation </label>

                            <Field 
                                changeFormation={changeFormation}
                                droppedPlayers={droppedPlayers} 
                                onDrop={insertPlayer} />

                        </div>
                    
                    </Grid>

                    <Grid item  sm={6} xs={12}>
                        <div className="form-group">
                            <label className="form-label no-mt" htmlFor="">Search Players</label>
                            <input type="text" placdeholer="Insert team name" onChange={onChange} />
                        </div>
                        <div className="content-list-players">
                            {listPlayers && listPlayers.map(
                                player => <LabelPlayer key={player.idPlayer} player={player}/>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
    )
}
