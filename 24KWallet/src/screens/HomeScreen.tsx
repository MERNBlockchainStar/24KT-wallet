import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import { lightBlue, lightGreen } from '@material-ui/core/colors';
import Balance from '../components/Balance';
import ERC20Item  from '../components/ERC20Item';

import AddTokenBtn  from '../components/AddTokenBtn';
import SendBtn  from '../components/SendBtn';
import BuyBtn from '../components/BuyBtn';
import SellBtn from '../components/SellBtn';

import { Account, AccountState } from '../types/account'
import { ERC20TokenInterface, ERC20TokenState} from '../types/token'
import { loadToken } from '../actions/token';
import { AppDispatch } from "../store";

import { CONTRACT_24KT, LOGO_URL } from '../constants'

interface Props extends RouteComponentProps {};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection : 'column',
        fontFamily : 'Roboto, sans-serif',
        flexFlow : 'column nowrap',
        alignSelf: 'auto',
        outline: 'none',
        width: '100%',
        height: '96vh',
        textAlign: 'center',
        background: 'linear-gradient(rgb(7, 46, 63), rgb(68, 99, 113))',
        alignItems: 'center',
        opacity: '1',
        padding: '10px 0 20px 0'
    },
    container: {
        width: '100%',
        margin: '0px'
    },
    text: {
        color: 'white',
        marginBottom: '20px'
    },
    actiongroup: {
        
    },
    actionbutton: {
        display: "inline-block",
        margin: "0px 20px 10px 0px"
    },
    paper: {
        margin: '0px',
        padding: '10px',
        display: 'block',
        height: 'calc(55vh)',
        background: 'rgba(68, 120, 113, 0.8)',
        overflow: 'auto',
    }
});

const theme = createMuiTheme({
    palette: {
      primary: lightGreen,
      secondary: lightBlue
    },
});
const HomeScreen = ({location, history}: Props) => {
    const classes = useStyles();
    const accountState: AccountState = useSelector((state: any) => state.account);
    const account: Account | null = accountState.account;
    const tokenState: ERC20TokenState = useSelector((state: any) => state.token);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=> {
        if (!account) {
            history.push("/");
        } else {
            for (let address of tokenState.tokens.keys()) {
                dispatch(loadToken(address));
            }
        }
    }, [history, account]);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={12}> 
                        <Header accountAddress={account ? account.address:"Not Connected"}/> 
                    </Grid>
                    <Grid item xs={12}>
                        <Balance balance={account? account.ethBalance: 0} currency="ETH"/>
                        <Balance balance={account? account.balance: 0} currency="24KT"/>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.actiongroup}>
                            <SellBtn/>
                            <BuyBtn/>
                            <SendBtn/>
                        </div> 
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} variant='outlined' square className={classes.paper}>
                            {Array.from(tokenState.tokens.values()).map((token: ERC20TokenInterface)=><ERC20Item icon={token.logo? token.logo: LOGO_URL} symbol={token.symbol} name={token.name} balance={token.balance} pending={token.isPending}></ERC20Item>)}
                            <AddTokenBtn/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default HomeScreen;