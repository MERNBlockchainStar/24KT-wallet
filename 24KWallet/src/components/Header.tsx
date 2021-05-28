import React, {useState} from 'react';
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    account: {
        color: "white"
    }
}));

const Header = ({accountAddress} : {accountAddress: string}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.account}>{accountAddress}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;