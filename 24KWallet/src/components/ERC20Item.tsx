import React, {useState} from 'react';
import { Grid, Typography, Avatar, Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      flexWrap: 'wrap',
      paddingTop: '5px',
      marginBottom: '12px',
      borderRadius: '10px',
      alignItems: 'center',
      position: 'relative',
      display: 'flex'
    },
    avatar: {
      display: 'inline-block',
      margin: '10px'
    },
    currency: {
      display: 'inline-block'
    },
    symbol: {
      color: "grey",
      fontWeight: 'bolder'
    },
    name: {
      color: "darkgrey"
    },
    balance: {
      position: 'absolute',
      right: '10px'
    }
}));

const ERC20Item = ({icon, symbol, name, balance, pending}: {icon: string, symbol: string, name: string, balance: number, pending: boolean}) => {
    const classes = useStyles();

    return (
        <Paper elevation={1} className={classes.root}>
            <Avatar src={icon} alt={symbol} className={classes.avatar}></Avatar>
            <div className={classes.currency}>
                <Typography variant="h6" className={classes.symbol}>{symbol}</Typography>
                <Typography variant="subtitle1" className={classes.name}>{name}</Typography>
            </div>
            <Typography variant="h6" className={classes.balance}>{balance}{pending?<CircularProgress color='secondary' size="1rem"/>:''}</Typography>
        </Paper>
    );
}

export default ERC20Item;