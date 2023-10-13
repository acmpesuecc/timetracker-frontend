
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

import {Button, Card, Dialog, Grid, TextField, Typography} from "@mui/material";
import React, {Dispatch, SetStateAction, useState} from "react";
import useCreateSheet from "../hooks/useCreateSheet";

export default function AddSheetModal({open, setOpen}: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [sheetName, setSheetName] = useState("")
    const [clickable, setClickable] = useState(true)
    const createSheet = useCreateSheet()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSheetName(e.target.value)
    }
    const onClose = () => {
        setOpen(false)
    }

    const onClick = (e: React.FormEvent) => {
        setClickable(false)
        createSheet(sheetName).then(r => {
            if (!r){
                alert("Error")
            }
            setClickable(true)
            setOpen(false)
        })
        e.preventDefault()
    }

    return <Dialog open={open} onClose={onClose}>
        <Card sx={{p: 2}}>
            <form onSubmit={onClick}>
                <Grid container direction={"column"} alignItems={"center"} gap={2}>
                    <Typography variant={"h6"}>Create Sheet</Typography>
                    <TextField value={sheetName} onChange={onChange} label={"Sheet Name"}/>
                    <Button type={"submit"} disabled={!clickable} variant={"text"} sx={{alignSelf: "stretch"}}>OK!</Button>
                </Grid>
            </form>
        </Card>
    </Dialog>
}