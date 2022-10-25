import React from 'react';
import {Button, TextField, Grid} from '@mui/material';
import { useDispatch } from "react-redux";
import { ActionCreators } from "../redux_functions/actions";
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    let state = {firstName: "", lastName: "", username: "", email: "", password: ""};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function handleChange(event) {
    //     state.username = event.state.username;
    //     state.password = event.state.password;
    // }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(ActionCreators.signup({firstName: state.firstName, lastName: state.lastName, username: state.username, email: state.email, password: state.password}));
        navigate("/Dashboard");
    }
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={1} />
                <Grid item xs={5}>
                    <TextField name='firstName' label={'First Name'} variant={'outlined'}
                        onChange={(e) =>{
                            state.firstName = e.target.value;
                        }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField name='lastName' label={'Last Name'} variant={'outlined'}
                        onChange={(e) =>{
                            state.lastName = e.target.value;
                        }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <TextField name='username' label={'Username'} variant={'outlined'}
                        onChange={(e) =>{
                            state.username = e.target.value;
                        }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <TextField name='email' label={'Email'} variant={'outlined'}
                        onChange={(e) =>{
                            state.email = e.target.value;
                        }}
                        fullWidth
                        required
                />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <TextField name='password' label={'Password'} variant={'outlined'}
                        onChange={(e) =>{
                            state.password = e.target.value;
                        }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button variant={'contained'} type={'submit'} fullWidth style={{backgroundColor: '#8C52FF', borderRadius: '20px'}}>Log In</Button>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={12} />
            </Grid>            
        </form>
    )
}

export default Signup;