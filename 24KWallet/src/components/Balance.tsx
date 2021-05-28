import React, {useState} from 'react';
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "inline-block",
      margin: "0px 20px 0px 20px"
    },
    balance: {
        color: "white",
        display: "inline-block",
    },
    currency: {
        color: "darkgrey",
        display: "inline-block"
    }
}));

const Balance = ({balance, currency}: {balance: number, currency: string}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.balance}>{balance}</Typography>
            <Typography variant="h6" className={classes.currency}>{currency}</Typography>
        </div>
    );
}

export default Balance;