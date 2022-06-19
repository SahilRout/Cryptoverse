import { Box, Button, TextField } from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error("Please fill all the Fields", {
                theme: "dark",
            });
            return;
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success(`Log In Sucessful. Welcome ${result.user.email}`, {
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
            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Log in
            </Button>
        </Box >
    )
}

export default Login