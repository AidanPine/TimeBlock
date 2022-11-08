import React from 'react';
import { Grid } from '@mui/material';

const DOTWRow = () => {
    return (
        <Grid item container spacing={0} xs={12} justifyContent="center">
            <Grid item xs={1} />
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>S</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>M</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>T</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>W</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>T</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>F</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>S</p>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}

export default DOTWRow;