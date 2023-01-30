import {Button, Grid, TextField, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";

interface LoginState {
    username: string,
    password: string
}

function Login() {

    const doLogin = (e: React.FormEvent) => {
        e.preventDefault()

    }
    const [state, setState] = useState<LoginState>({username: "", password: ""})
    const theme = useTheme()
    return <>
        <Typography variant={"h3"} m={2}>
            Login!
        </Typography>

        <form onSubmit={doLogin}>
            <Grid gap={2} container direction={"column"} alignItems={"flex-start"} m={2} width={"fit-content"}
                  border={"1px solid"} borderColor={theme.palette.grey.A400} p={2}>
                <TextField type={"password"} value={state.password} name={"password"} label={"Password"}/>
                <TextField name={"username"} label={"Username"}/>
                <Grid alignSelf={"center"}>
                    <Button type={"submit"} variant={"contained"}>Submit!</Button>
                </Grid>
            </Grid>
        </form>
    </>
}

export default Login
