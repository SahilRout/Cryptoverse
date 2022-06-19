import { AppBar, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from '@material-ui/core'
import { Container } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoContext from '../context/CryptoContext'
import AuthModal from './Authentication/AuthModal'
import UserSidebar from './Authentication/UserSidebar'

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
    selectBox: {
        width: 100,
        height: 40,
        marginRight: 15,
    },
}))

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark"
    }
})

const Header = () => {
    const classes = useStyles()
    let navigate = useNavigate()
    const { currency, setCurrency, user } = useContext(CryptoContext)
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate("/")}
                            className={classes.title}
                            variant="h6">
                            Crypto Verse
                        </Typography>
                        <Select variant='outlined' className={classes.selectBox}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar >
        </ThemeProvider>
    )
}

export default Header
