import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Header from '../../components/Header';
import TeamInfo from '../../components/TeamInfo';
import Footer from '../../components/Footer';
import Squad from '../../components/Squad';

export default function Register(props) {

    const { createMode, saveSquad } = props;

    return (
        <>
            <Header />
            <div className="container">
                <Card>
                    <div className="card-app__container-header">
                        <p className="titles myTeams__content-title" >Create your team</p>
                        <Grid item xs={2}>
                            <button className='btn-default' onClick={() => createMode(false)}>Back</button>
                        </Grid>
                    </div>

                    <Divider />

                    <Grid container>
                        <Grid item xs={12}>
                            <div className="card-app__container">
                                <Grid item xs={12}>
                                    <TeamInfo createMode={props.createMode} saveSquad={props.saveSquad} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Squad createMode={props.createMode} saveSquad={props.saveSquad} />
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
                <Footer />
            </div>
        </>
    )
}


