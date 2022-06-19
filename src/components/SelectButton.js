import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
    selectbutton: {
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        fontWeight: 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
            fontWeight: 700
        },
        width: "22%",
    }
}))
const SelectButton = ({ children, selected, onClick, }) => {
    const classes = useStyles();
    return (
        <span
            onClick={onClick}
            className={classes.selectbutton}
        >
            {children}
        </span>
    )
}

export default SelectButton