import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

import './styles.css';

export default function TeamInfo(props) {

    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [teamWebSite, setTeamWebSite] = useState('');
    const [type, setType] = useState('');
    const [tags, setTags] = useState([]);

    const [squad, setSquad] = useState([]);

    const { createMode, saveSquad } = props;
    const [autocompleteValue, setAutoCompleteValue] = useState([]);

    return (

        <Grid container>
            <Grid item xs={12}>
                <h3 className="teamInfo__title">Team information</h3>
                <form>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="">Team name</label>
                                <input
                                    type="text"
                                    placdeholer="Insert team name"
                                    value={teamName || ''}
                                    onChange={e => setTeamName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mt-20">
                                <label className="form-label" htmlFor="">Description</label>
                                <textarea
                                    placdeholer="Insert team name"
                                    value={description || ''}
                                    rows={6}
                                    cols={15}
                                    onChange={e => setDescription(e.target.value)}>
                                </textarea>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="">Team website</label>
                                <input
                                    type="text"
                                    placdeholer="http://myteam.com"
                                    value={teamWebSite || ''}
                                    onChange={e => setTeamWebSite(e.target.value)} />
                            </div>

                            <div className="form-group space-custom">
                                <label className="form-label" htmlFor="">Team type</label>
                                <div className="d-flex align-item-center">
                                    <div className="d-flex align-item-center" style={{ 'marginRight': '60px' }}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="Real"
                                            onChange={e => setType(e.target.value)} />Real
                                    </div>

                                    <div className="d-flex align-item-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="Fantasy"
                                            onChange={e => setType(e.target.value)} />Fantasy
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="">Tags</label>

                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={[]}
                                    value={tags}
                                    open={false}
                                    onChange={(e, newval, reason) => {
                                        setTags(newval);
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Digite suas tags"

                                            onKeyDown={e => {
                                                if (e.keyCode === 13 && e.target.value) {
                                                    setTags(tags.concat(e.target.value));
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>

    )
}
