import {  FileCopyOutlined } from "@mui/icons-material"
import { Tooltip,Button, ClickAwayListener } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useState } from "react";

const useStyles = makeStyles({
    root : {
        cursor:'pointer'
    },
    icon : {
        marginRight : '5px'
    }
})

export const CopyToClicpBoard = ({text}) => {
    const[state,setState] = useState('copy');
    const classes = useStyles();
    const onTextClick = () => {
        navigator.clipboard.writeText(text);
        setState('copied');
    }
    const returnState = () => setState('copy');
    return (
        <ClickAwayListener onClickAway = {returnState}>
            <Tooltip title = {state} placement= 'top-start' arrow>
                <Button className = {classes.root} onClick = {onTextClick} >
                    <FileCopyOutlined className = {classes.icon} fontSize = 'small'/>
                    {text}
                </Button>
            </Tooltip>
        </ClickAwayListener>
    )
}

