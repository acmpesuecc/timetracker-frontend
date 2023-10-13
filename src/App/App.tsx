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

import {Button, Card, Grid, Paper, Typography} from "@mui/material";
import useSheets from "../hooks/useSheets";
import {useNavigate} from "react-router-dom";
import {Sheet} from "../gql/graphql";
import React, {useState} from "react";
import {Add} from "@mui/icons-material";
import AddSheetModal from "./AddSheetModal";
<link rel="stylesheet" href="button.css" />
export default function App() {
    const sheets = useSheets()
    const navigate = useNavigate()
    const [createSheet, setCreateSheet] = useState(false)
    const onClickCreateSheet = () => {
        setCreateSheet((s) => !s)
    }
    const ocf = (id: string) => {
        const url = `/sheets/${id}`
        navigate(url)
    }
    return <>
        <Paper sx={{m: 2, p: 2}}>
            <Typography variant={"h1"}>Your Sheets</Typography>
            <Grid container p={2} m={2} gap={2} alignItems={"stretch"}>
                {
                    sheets.map((sh: Sheet) => {
                        const oc = () => {
                            ocf(sh.id)
                        }
                        return <Grid key={sh.id}>
                            <Card onClick={oc} elevation={3} sx={{height: "100%"}}>
                                <Grid container p={2} height={"100%"} alignItems={"center"}>
                                    
                                    <Button id="bt" type={"submit"} variant={"text"} sx={{alignSelf: "stretch"}} >{sh.name}</Button>
                                </Grid>
                            </Card>
                        </Grid>
                    })
                }
                <Grid>
                    <Card sx={{p: 2}}>
                        <Button endIcon={<Add/>} onClick={onClickCreateSheet}>Add a sheet</Button>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
        <AddSheetModal open={createSheet} setOpen={setCreateSheet}/>
    </>
}
