import { Box, Button, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import CryptoContext from '../../context/CryptoContext'
import { auth } from "../../firebase"
const SignUp = ({ handleClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error("Please fill all the Fields", {
                theme: "dark",
            });
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                theme: "dark"
            })
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            toast.success(`Sign Up Sucessful. Welcome ${result.user.email}`, {
                theme: "dark"
            });
            handleClose();
        } catch (error) {
            toast.error(error.message, {
                theme: "dark",
            })
            return;
        }
    }
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: 30
            }}
        >
            <TextField
                variant='outlined'
                type="email"
                label="Enter Email"
                value={email}
                onChange={((e) => setEmail(e.target.value))}
                fullwidth
            />
            <TextField
                variant='outlined'
                type="password"
                label="Enter Password"
                value={password}
                onChange={((e) => setPassword(e.target.value))}
                fullwidth
            />
            <TextField
                variant='outlined'
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={((e) => setConfirmPassword(e.target.value))}
                fullwidth
            />
            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </Box >
    )
}

export default SignUp