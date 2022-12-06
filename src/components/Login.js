import React, { Component } from 'react';
import {Button, TextField, Grid} from '@mui/material';
import { connect } from "react-redux";
import { signIn } from "../redux_functions/actions";
import { withRouter } from "./withRouter";
import { myFirebase } from "../firebase_functions/firebase";


class Login extends Component {
    state = {email: "", password: ""};


    handleChange = (event) => {
         this.setState({
             [event.target.id]: event.target.value
         })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signIn(this.state);
        myFirebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigate('/timeblock/dashboard');
            }
        })
    }

    render() {
        const { authError } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                        <TextField id='email' label={'Email'} variant={'outlined'}
                                   onChange={this.handleChange}
                                   fullWidth
                                   required
                        />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                        <TextField id='password' label={'Password'} variant={'outlined'}
                                   onChange={this.handleChange}
                                   fullWidth
                                   required
                                   type="password"
                        />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={4}/>
                    <Grid item xs={4}>
                        <Button variant={'contained'} type={'submit'} fullWidth
                                style={{backgroundColor: '#8C52FF', borderRadius: '20px'}}>Log In</Button>
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={12}/>
                    <div className="red-text center">
                        { authError ? <p>{ authError }</p> : null}
                    </div>
                </Grid>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));