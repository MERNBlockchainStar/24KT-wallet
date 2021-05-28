import React from 'react';
import { LOGO_URL } from '../constants'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logo: {
        
    }
}));


const TokenLogo = ({width, height} : {width:number, height:number}) => {
    const classes = useStyles();
    return (
        <div>
            <img src={ LOGO_URL } className={classes.logo} width={width} height={height} alt="24KToken"></img>
        </div>
    );
}

export default TokenLogo;