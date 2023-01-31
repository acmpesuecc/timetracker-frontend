/*
 * This software has been written with the idea of building a minimalistic time tracker.
 * Copyright (c) 2023.  Samarth Ramesh
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import {Button, Grid, TextField, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import useLogin from "./hooks/useLogin";
import {useNavigate} from "react-router-dom";

interface LoginState {
    username: string,
    password: string
}

function Login() {
    const navigate = useNavigate()
    const doLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const status = await login(state.username, state.password)
        if (status){
            navigate("/sheets")
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]:e.target.value})
    }
    const [state, setState] = useState<LoginState>({username: "", password: ""})
    const login = useLogin()

    const theme = useTheme()
    return <Grid container minHeight={"100vh"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={5}>
        <Typography variant={"h1"}>TimeTracker</Typography>
        <form onSubmit={doLogin}>
            <Grid gap={2} container direction={"column"} alignItems={"center"} m={2} width={"fit-content"}
                  border={"1px solid"} borderColor={theme.palette.grey.A400} p={2}>
                <Typography variant={"h3"} m={2}>
                    Login!
                </Typography>
                <TextField name={"username"} value={state.username} label={"Username"} onChange={onChange}/>
                <TextField type={"password"} onChange={onChange} value={state.password} name={"password"} label={"Password"}/>
                <Grid alignSelf={"center"}>
                    <Button type={"submit"} variant={"contained"}>Submit!</Button>
                </Grid>
            </Grid>
        </form>

    </Grid>
}

export default Login
