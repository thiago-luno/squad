import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Picked from '../Picked';
import './styles.css';

export default function TopFive() {
    return (
        <div>
            <Card className="card-app topFive">
                <div className="card-app__container-header topFive__header">
                    <p className="titles">Top 5</p>
                </div>
                <Divider />

                <div className="card-app__container">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <p className="bold">Highest avg age</p>
                            <div className="topFive__avg">
                                <div className="topFive__avg-label">
                                    <span>Inter Milan</span>
                                    <span className="bold">31.9</span>
                                </div>

                                <div className="topFive__avg-label">
                                    <span>Inter Milan</span>
                                    <span className="bold">31.9</span>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="bold">Lowest avg age</p>
                            <div className="topFive__avg">
                                <div className="topFive__avg-label">
                                    <span>Inter Milan</span>
                                    <span className="bold">31.9</span>
                                </div>

                                <div className="topFive__avg-label">
                                    <span>Inter Milan</span>
                                    <span className="bold">31.9</span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Card>

            <Picked />

        </div>
    )
}
