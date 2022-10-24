import React from 'react';

import GridContainer from '../GridContainer/GridContainer';

import { Grid, Grow } from '@material-ui/core';

const Home = () => {
    return (
        <Grow in >
            <Grid container direction="row" justifyContent="center" alignItems="center"> 
                <GridContainer />
            </Grid>
        </Grow>
    )
}

export default Home