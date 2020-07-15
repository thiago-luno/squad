import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import ServiceApi from "../../services/api";
import LabelPlayer from './LabelPlayer';
import Field from './Field';
import _ from "lodash";

import './styles.css'

export default function Squad(props) {

    const { createMode, saveSquad } = props;

    const [listPlayers, setListPlayers] = useState([]);
    const [formation, setFormation] = useState([]);

    const [droppedPlayers, setDroppedPlayers] = useState([])
   

    const delayedQuery = _.debounce(q => searchPlayer(q), 300);

    async function searchPlayer(name) {
        const response = await ServiceApi.getPlayer(name);
        setListPlayers(response);
    }

    function onChange(e) {
        delayedQuery(e.target.value);
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

                            <Field />

                        </div>

                        <button className="btn-save">Save</button>
                    </Grid>

                    <Grid item xs={6}>
                        <div className="form-group">
                            <label className="form-label no-mt" htmlFor="">Search Players</label>
                            <input type="text" placdeholer="Insert team name" onChange={onChange} />
                        </div>
                        {listPlayers && listPlayers.map(
                            player => <LabelPlayer key={player.idPlayer} player={player} />)}
                    </Grid>
                </Grid>
            </Grid>


    )
}
