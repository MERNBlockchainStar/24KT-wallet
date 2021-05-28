import React from 'react';
import { Button } from '@material-ui/core'
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "inline-block",
      margin: "0px 20px 0px 20px"
    },
    modal: {
      display: 'block'
    },
    actionbutton: {
        display: "inline-block",
        margin: "0px 20px 10px 0px"
    },
    title: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bolder'
    }
}));

const SellBtn = () => {
    const classes = useStyles();
    return (
        <div className={classes.actionbutton}>
            <Button variant="outlined" color="primary" startIcon={<CachedIcon/>}>SELL</Button>
        </div>
    );
}

export default SellBtn;