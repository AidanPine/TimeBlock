import React from 'react';
import {Button, TextField, Grid} from '@mui/material';
import { connect } from "react-redux";
import { signUp } from "../redux_functions/actions";
import { useNavigate } from 'react-router-dom';
import {myFirebase} from "../firebase_functions/firebase";


const Signup = (props) => {
    let state = {firstName: "", lastName: "", username: "", email: ""};

    const navigate = useNavigate();
    const { authError } = props;



    function handleSubmit(event) {
        event.preventDefault();
        props.signUp(state);
        myFirebase.auth().onAuthStateChanged(user => {
            if (user) {
                navigate('/timeblock/dashboard');
            }
        })
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
                        type="password"
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button variant={'contained'} type={'submit'} fullWidth style={{backgroundColor: '#8C52FF', borderRadius: '20px'}}>Sign Up</Button>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={12} />
                <div className="red-text center">
                    { authError ? <p>{ authError }</p> : null}
                </div>
            </Grid>            
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);