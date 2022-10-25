import React from 'react';
import {Button, TextField, Grid} from '@mui/material';
import { useDispatch } from "react-redux";
import { ActionCreators } from "../redux_functions/actions";
import { useNavigate } from 'react-router-dom';



const Login = () => {
    let state = {username: "", password: ""};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function handleChange(event) {
    //     state.username = event.state.username;
    //     state.password = event.state.password;
    // }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(ActionCreators.login({username: state.username, password: state.password}));
        navigate("/Dashboard");
    }
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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

export default Login;