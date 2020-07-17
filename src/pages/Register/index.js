import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Squad from '../../components/Squad';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Utils from '../../services/utils';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import  Api  from '../../services/api'; 
import { useEffect } from 'react';

export default function Register(props) {
    const [id, setId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [teamWebSite, setTeamWebSite] = useState('');
    const [type, setType] = useState('');
    const [tags, setTags] = useState([]);
    const [squad, setSquad] = useState([]);
    
    const history = useHistory();
    
    const { register, handleSubmit, errors } = useForm();
    
    function saveSquad(squad, formation) {
        setSquad({squad, formation})
    }

    useEffect(() => {   
        
        if(props.match.params.id) 
            editMode();
    },[]);
    
    function editMode(id) {
        const team = Api.getSquadById(props.match.params.id);
        setId(id);
        setTeamName(team.teamName);
        setDescription(team.description);
        setTeamWebSite(team.teamWebSite);
        setType(team.type);
        setTags(team.tags);  
        setSquad(team.squad);
    }

    function onSubmit(data) {
        let teams = null;
        let idTeam = null;

        if(Api.getSquads().length > 0) {
            teams = Api.getSquads();
            idTeam = props.match.params.id ? props.match.params.id : teams[0].id + 1;
        } else {
            idTeam = 1;
        }

        const team = {
            teamName,
            description,
            teamWebSite,
            type,
            tags,
            squad
        }

        team.id =  id ? id : idTeam;
        Api.setSquad(team)
        history.push("/");
    }

    const formReference = useRef();

    return (
        <>
            <Header />
            <div className="container">
                <Card>
                    <div className="card-app__container-header">
                        <p className="titles myTeams__content-title" >Create your team</p>
                        <Grid item xs={2}>
                            <Link to="/" className='btn-default' style={{"padding": "0 30px"}}>Back</Link>
                        </Grid>
                    </div>

                    <Divider />

                    <Grid container>
                        <Grid item xs={12}>
                            <div className="card-app__container">
                                <form onSubmit={handleSubmit(onSubmit)} ref={formReference}>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <h3 className="teamInfo__title">Team information</h3>
                                                <Grid container spacing={10}>
                                                    <Grid item xs={6}>
                                                        <div className="form-group">
                                                            <label className={errors.teamName ?  "form-label error-message" : null + " form-label"} htmlFor="team-name">Team name</label>
                                                            <input
                                                                type="text"
                                                                id="teamName"
                                                                name="teamName"
                                                                placdeholer="Insert team name"
                                                                value={teamName}
                                                                ref={register({
                                                                    required: true,
                                                                })}
                                                                onChange={e => setTeamName(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="form-group mt-20">
                                                            <label className="form-label" htmlFor="description">Description</label>
                                                            <textarea
                                                                placdeholer="Insert team name"
                                                                id="description"
                                                                name="description"
                                                                value={description}
                                                                rows={6}
                                                                cols={15}
                                                                ref={register()}
                                                                onChange={e => setDescription(e.target.value)}>
                                                            </textarea>
                                                        </div>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <div className="form-group">
                                                            <label className={errors.website ?  "form-label error-message" : null + " form-label"} htmlFor="website">Team website</label>
                                                            <input
                                                                type="text"
                                                                id="website"
                                                                name="website"
                                                                placdeholer="http://myteam.com"
                                                                value={teamWebSite || ''}
                                                                ref={register({
                                                                    required: true,
                                                                    validate: value => Utils.checkUrl(value)
                                                                })}
                                                                onChange={e => setTeamWebSite(e.target.value)} />
                                                             
                                                        </div>

                                                        <div className="form-group space-custom">
                                                            <label className="form-label" htmlFor="type1">Team type</label>
                                                            <div className="d-flex align-item-center">
                                                                <div className="d-flex align-item-center" style={{ 'marginRight': '60px' }}>
                                                                    <input
                                                                        id="type1"
                                                                        type="radio"
                                                                        name="type"
                                                                        value="Real"
                                                                        ref={register()}
                                                                        onChange={e => setType(e.target.value)} />Real
                                                                </div>

                                                                <div className="d-flex align-item-center">
                                                                    <input
                                                                        id="type2"
                                                                        type="radio"
                                                                        name="type"
                                                                        value="Fantasy"
                                                                        ref={register()}
                                                                        onChange={e => setType(e.target.value)} />Fantasy
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="form-label" htmlFor="tags-outlined">Tags</label>

                                                            <Autocomplete
                                                                multiple
                                                                id="tags-outlined"
                                                                name="tags-outlined"
                                                                options={[]}
                                                                value={tags}
                                                                ref={register()}
                                                                open={false}
                                                                onChange={(e, newval) => {
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
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>

                                        <Squad saveSquad={saveSquad} infoSquad={props.match.params.id}/>
                                        
                                        <Grid container spacing={10}>
                                            <Grid item xs={6}>                            
                                                <button type="submit" className="btn-save">Save</button>
                                            </Grid>
                                        </Grid>    
                                    </Grid>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
                <Footer />
            </div>
        </>
    )
}


