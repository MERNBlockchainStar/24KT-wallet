import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Grid, Button, Dialog, DialogTitle, DialogActions, DialogContent, Divider, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { sendToken } from '../actions/token';
import { AppDispatch } from "../store";

import { CONTRACT_24KT } from '../constants';

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

const SendBtn = () => {
    const classes = useStyles();
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    function handleSendToken() {
        setOpen(true);
    }
    function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAddress(e.target.value);
    }
    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmount(parseInt(e.target.value));
    }
    function handleSend() {
        if (address !== '' && amount !== 0)
            dispatch(sendToken(address, amount, CONTRACT_24KT));
        setOpen(false)
    }
    function handleClose() {
        setOpen(false);
    }
    return (
        <div className={classes.actionbutton}>
            <Button variant="outlined" color="primary" endIcon={<SendIcon/>} onClick={handleSendToken}>Send</Button>
            <Dialog open={open} onClose={handleClose} className={classes.modal}>
                <DialogTitle><Typography variant="h4" className={classes.title}>Send Token</Typography></DialogTitle>
                <Divider variant="middle"/>
                <DialogContent>
                    <TextField type="text" color="secondary" fullWidth required label="Recipent Address" value={address} onChange={handleAddressChange}></TextField>
                    <TextField type="number" color="secondary" fullWidth required label="Amount" value={amount} onChange={handleAmountChange}></TextField>
                </DialogContent>
                <Divider variant="middle"/>
                <DialogActions>
                    <Button variant="outlined" color="secondary" autoFocus onClick={handleSend} endIcon={<SendIcon/>}>Send</Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose} startIcon={<CloseIcon/>}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SendBtn;