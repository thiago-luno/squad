import React, { useState, useEffect}  from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MyTeams from '../../components/MyTeams';
import TopFive from '../../components/TopFive';

import './styles.css';

export default function Home(props) {

    const [ squads, setSquads ] = useState([])

    useEffect(() => {
        setSquads(JSON.parse(sessionStorage.getItem('teams')))
    }, [])

    return (
        <div>
            <Header />
            <div className="container">
                <div className="content-home">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <MyTeams 
                                squads={squads} 
                                deleteSquad={props.deleteSquad}
                                createMode={props.createMode}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <TopFive />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Footer />
        </div>
    )
}
