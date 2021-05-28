import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Grid, Button, Dialog, DialogTitle, DialogActions, DialogContent, Divider, TextField } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';

import { loadToken } from '../actions/token';
import { AppDispatch } from "../store";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "inline-block",
      margin: "0px 20px 0px 20px"
    },
    modal: {
      display: 'block'
    },
    title: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bolder'
    }
}));

const AddTokenBtn = () => {
    const classes = useStyles();
    const [address, setAddress] = useState('');
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    function handleAddToken() {
        setOpen(true);
    }
    function handleChangeAddress(e: React.ChangeEvent<HTMLInputElement>) {
        setAddress(e.target.value);
    }
    function handleAdd() {
        if (address !== '')
            dispatch(loadToken(address));
        setOpen(false)
    }
    function handleClose() {
        setOpen(false);
    }
    return (
        <div>
            <Button variant="outlined" color="primary" startIcon={<AddBoxIcon/>} onClick={handleAddToken}>Add Token</Button>
            <Dialog open={open} onClose={handleClose} className={classes.modal}>
                <DialogTitle><Typography variant="h4" className={classes.title}>Add New Token</Typography></DialogTitle>
                <Divider variant="middle"/>
                <DialogContent>
                    <TextField type="text" color="secondary" fullWidth required label="Contract Address" value={address} onChange={handleChangeAddress}></TextField>
                </DialogContent>
                <Divider variant="middle"/>
                <DialogActions>
                    <Button variant="outlined" color="secondary" autoFocus onClick={handleAdd}>Add</Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTokenBtn;