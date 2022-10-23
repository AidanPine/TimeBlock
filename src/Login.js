import React from 'react';
import {Button, TextField} from '@mui/material';
import { useDispatch } from "react-redux";
import { ActionCreators } from "./actions";
import { useNavigate } from 'react-router-dom';



function Login(props) {
    let state = {username: "", password: ""};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(event) {
        state.username = event.state.username;
        state.password = event.state.password;
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(ActionCreators.login({username: state.username, password: state.password}));
        navigate("/Dashboard");
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField name='username' label={'username'} variant={'outlined'}
                       onChange={(e) =>{
                           state.username = e.target.value;
                       }}
                       fullWidth
                       required
            />
            <TextField name='password' label={'password'} variant={'outlined'}
                       onChange={(e) =>{
                           state.password = e.target.value;
                       }}
                       fullWidth
                       required
            />
            <Button variant={'contained'} type={'submit'}>Log In</Button>
        </form>
    )
}

export default Login;