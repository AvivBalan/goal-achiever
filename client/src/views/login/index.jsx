import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import user from '../../services/user';
import { Redirect } from 'react-router-dom';
import './login.css'

function LoginPage(props) {
    const [state, setState] = useState({
        email: 'user@goal-achiever.com',
        password: 'Aa123456',
        redirect: false,
    });

    const handleLogin = e => {
        e.preventDefault();

        user.login(state.email, state.password).then(() => setState({redirect: true}));
    };

    const { from } = props.location.state || { from: { pathname: '/' } };

    return (
        <Card className='login-card'>
            {state.redirect || user.isLoggedIn()? <Redirect to={from}/> : null}
            <CardContent>
            <form name="loginform" id="loginform" onSubmit={handleLogin}>
                <Stack spacing={2}>
                    <h2>Login</h2>
                    <TextField id="email" name="email" value={state.email}/>
                    <TextField type='password' id="password" name="password" value={state.password}/>
                    <Button variant="contained" type="submit">Login</Button>
                </Stack>
            </form>
            </CardContent>
        </Card>
    );
}

export default LoginPage;