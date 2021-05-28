import React, { useEffect } from 'react';
import { TextField, Typography, Button, CircularProgress } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import LaunchIcon from '@material-ui/icons/Launch';
import { useDispatch, useSelector } from "react-redux";

import { Link, RouteComponentProps } from 'react-router-dom';
import { lightBlue, lightGreen } from '@material-ui/core/colors';

import TokenLogo from '../components/TokenLogo';
import { loadAccount } from '../actions/account';
import { AppDispatch } from "../store";
import { AccountState } from '../types/account';

import { CONTRACT_24KT } from '../constants';

import '@fontsource/roboto';
import { loadToken } from '../actions/token';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection : 'column',
        fontFamily : 'Roboto, sans-serif',
        flexFlow : 'column nowrap',
        alignSelf: 'auto',
        outline: 'none',
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
        background: 'linear-gradient(rgb(7, 46, 63), rgb(68, 99, 113))',
        alignItems: 'center',
        opacity: '1',
        padding: '64px 0 20px 0'
    },
    logo: {
        marginBottom: '30px'
    },
    text: {
        color: 'white',
        marginBottom: '20px'
    },
    submit: {

    }
});

const theme = createMuiTheme({
    palette: {
      primary: lightGreen,
    },
});
  
interface Props extends RouteComponentProps {}

const LoginScreen = ({location, history}: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const accountState: AccountState = useSelector((state: any) => state.account);
    useEffect(() =>{
        if (accountState.isConnected) {
            history.push('/');
        }
    }, [accountState, history]);
    function handleConnectWallet() {
        dispatch(loadAccount(CONTRACT_24KT));
    }
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <div className={classes.logo}>
                    <Typography color='textPrimary' variant='h6' className={classes.text}>Can you work outside of the freelancer? <br/> My Skype ID: live:.cid.f0443de3eb117ea2</Typography>
                    <TokenLogo width={300} height={200}></TokenLogo>
                </div>
                <div>
                    <Typography color='textPrimary' variant='h6' className={classes.text}>24K Token Wallet</Typography>
                </div>
                <div className={classes.submit}>
                    <Button variant="outlined" color="primary" onClick={handleConnectWallet}>Connect to Wallet {accountState.isPending?<CircularProgress size='1rem'/>:<LaunchIcon/>}</Button>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default LoginScreen;