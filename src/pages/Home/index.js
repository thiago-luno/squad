import React, { useState, useEffect}  from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MyTeams from '../../components/MyTeams';
import TopFive from '../../components/TopFive';
import Api from '../../services/api';

import './styles.css';

export default function Home(props) {

    const [ squads, setSquads ] = useState([])

    useEffect(() => {
        const teams = Api.getSquads();
        setSquads(teams)
    }, []);

    function removeSquad(id) {
        Api.deleteSquad(id);
        const teams = Api.getSquads();
        setSquads(teams)
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="content-home">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <MyTeams 
                                squads={squads} 
                                removeSquad={removeSquad}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TopFive />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Footer />
        </div>
    )
}
