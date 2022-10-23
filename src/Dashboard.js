import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import logo from './assets/tb-icon.png';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.profile.profile);
    const navigate = useNavigate();
    const handleClick = () => {navigate("/")};

    return (
        <div className="App">
            <Grid container spacing={3} align="right" style={{marginTop: "0px"}}>
                <Grid item xs={2} sm={2} md={2} lg={1} align="left">
                    <img src={logo} alt="logo" style={{width: "30px", marginLeft: "20px", boxShadow: "0px 0px 12px 10px rgba(0,0,0,0.97)"}} />
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={10} align="center">
                    <Typography variant="h5" color="#ffffff">Dashboard</Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={1} align="right">
                    <IconButton aria-label="delete" style={{ cursor: 'pointer', color: "#eeeeee", height: "35px", width: "35px", backgroundColor: "#8C52FF", marginRight: "20px"}} onClick={handleClick} >
                        {
                            // Go to home
                        }
                        <HomeIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Typography variant={'h5'}>
                Username: {user.username}
            </Typography>
            <Typography variant={'h5'}>
                Password: {user.password}
            </Typography>
        </div>
    );
}

export default Dashboard;