import React from 'react';
import { Typography, Grid, Button, Dialog, DialogTitle } from '@mui/material';
import '../styles/App.css';
import logo from '../assets/TimeBlock.png';
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import InfoCard from './InfoCard';
import {signOut} from "../redux_functions/actions";
import {connect, useSelector} from "react-redux";


const Home = (props) => {
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const authEmpty = useSelector(state => state.firebase.auth.isEmpty);

    const handleOpenLogin = () => {
        setOpenLogin(true);
    }

    const handleCloseLogin = () => {
        setOpenLogin(false);
    }

    const handleOpenSignup = () => {
        setOpenSignup(true);
    }

    const handleCloseSignup = () => {
        setOpenSignup(false);
    }

    const handleSignOut = () => {
        props.signOut();
    }

    return (
        <div className="App">
            <Grid container spacing={3} style={{backgroundColor: '#000000', position: 'fixed', marginTop: '0px', boxShadow: '0 5px 5px rgba(0, 0, 0, 0.5)'}}>

                <Grid item xs={12} style={{height: "40px"}} /> 

                <Grid item xs={12} sm={3} md={2} lg={2} align="center">
                    <img src={logo} alt="logo" style={{marginLeft: "10px", width: "120px", boxShadow: "0px 0px 25px 20px rgba(0,0,0,0.97)"}} />
                </Grid>

                <Grid item xs={6} sm={6} md={8} lg={8}>
                    <Button
                        variant="contained"
                        style={{color: "#8C52FF", backgroundColor: "#ffffff", fontWeight: "bold", textTransform: "none", marginLeft: "10px", borderRadius: "10px", paddingLeft: "30px", paddingRight: "30px", float: "right"}}
                        onClick={authEmpty ? handleOpenLogin : handleSignOut}
                        sx={{ marginTop: { xs: '20px', sm: '0px', md: '0px', lg: '0px', xl: '0px' } }}>
                        { authEmpty ? 'Sign In': 'Sign Out'}
                    </Button>
                    <Dialog open={openLogin} onClose={handleCloseLogin}>
                        <DialogTitle style={{ fontWeight: 'bold', color: '#8C52FF'}} align="center">
                            Log In
                        </DialogTitle>
                        <Login/>
                    </Dialog>
                </Grid>

                <Grid item xs={6} sm={3} md={2} lg={2}>
                    {
                        authEmpty ?
                            <Button
                                variant="outlined"
                                style={{color: "#ffffff", backgroundColor: "#8C52FF", marginLeft: "10px", fontWeight: "bold", textTransform: "none", borderRadius: "10px", paddingLeft: "30px", paddingRight: "30px", float: "left"}}
                                onClick={handleOpenSignup}
                                sx={{ marginTop: { xs: '20px', sm: '0px', md: '0px', lg: '0px', xl: '0px' } }}>
                                Sign Up
                            </Button>
                            : null
                    }
                    <Dialog open={openSignup} onClose={handleCloseSignup}>
                        <DialogTitle style={{ fontWeight: 'bold', color: '#8C52FF'}} align="center">
                            Sign Up
                        </DialogTitle>
                        <Signup/>
                    </Dialog>

                </Grid>
                <Grid item xs={12} style={{height: "40px"}} /> 
            </Grid>
            <Grid container spacing={3} style={{backgroundColor: '#220f49'}}>

                <Grid item xs={12} stlye={{height: "10px"}} />

                <Grid item xs={12} sm={12} md={6} lg={6} container>
                    
                    <Grid item xs={12} style={{height: "300px"}} />

                    <Grid item xs={1} sm={1} md={1} lg={2} />
                    <Grid item xs={11} sm={11} md={11} lg={10} align="left">
                        <Typography variant="h4" style={{color: "#eeeeee", fontWeight: "bold"}}>Welcome to TimeBlock</Typography>
                    </Grid>
                    
                    <Grid item xs={12} style={{height: "15px"}} />

                    <Grid item xs={1} sm={1} md={1} lg={2}/>
                    <Grid item xs={11} sm={11} md={11} lg={10} align="left">
                        <Typography variant="h5" style={{color: "#8C52FF", fontWeight: 'bold'}}>The best way to keep track of your day.</Typography>
                    </Grid>

                    <Grid item xs={12} style={{height: "40px"}} />

                    <Grid item xs={1} sm={1} md={1} lg={2} />
                    <Grid item xs={11} sm={11} md={11} lg={10} align="left">
                        {
                            // Go to dashboard
                        }
                        <Link className="get-started-button" to={"/dashboard"} style={{backgroundColor: "#8C52FF", textDecoration: "none", color: "#ffffff", fontWeight: "500", textTransform: "none", borderRadius: "10px", paddingLeft: "30px", paddingRight: "30px", paddingTop: "10px", paddingBottom: "10px", fontFamily: "Roboto"}}>Get Started</Link>
                    </Grid>

                    <Grid item xs={12} style={{height: "500px"}} />
                
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <div sx={{ display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'} }} style={{backgroundColor: '#5731A4', width: '300%', height: '900px', borderRadius: '125% 125%', marginLeft: '10%'}}></div>
                    <div sx={{ display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'} }} style={{backgroundColor: '#8C25FF', width: '200%', height: '600px', borderRadius: '100% 100%', marginLeft: '30%', marginTop: '-750px'}}></div>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={1}/>
                    <Grid item xs={10} container spacing={5}>
                        {/* Container for InfoCards */}
                        <InfoCard img={1} title="De-Clutter Your Day" subtitle="Make your day easier by timeblocking your schedule. TimeBlock makes use of the extremely popular 'timeblocking' technique to ensure that you move through your day in the easiest and most structured way possible. "/>
                        <InfoCard img={2} title="Improve Time-Management" subtitle="Increase productivity and time management effectively. Studies show that timeblocking your day leads to you getting all your work done and even finding time to spare. AKA, more free time for you. It's a win win." />
                        <InfoCard img={3} title="Easy To Use" subtitle="The blocks snap to a grid to make it adjust to different time intervals. With a simple and elegant user interface, it is easier than ever to plan out your day and get things done. Here's to never getting caught up!" />
                        <InfoCard img={4} title="Create Blocks With Ease" subtitle="Easily click a button to add a new block to your day. Add a title, an estimated duration, and even pick any color to create your block. Durations can range from just 15 minutes to over 12 hours, depending on what you have going on." />
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(Home);
