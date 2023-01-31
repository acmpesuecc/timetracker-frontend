import {Button, Card, Dialog, Grid, TextField, Typography} from "@mui/material";
import React, {Dispatch, SetStateAction, useState} from "react";
import useCreateSheet from "../hooks/useCreateSheet";

export default function AddSheetModal({open, setOpen}: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [sheetName, setSheetName] = useState("")
    const createSheet = useCreateSheet()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSheetName(e.target.value)
    }
    const onClose = () => {
        setOpen(false)
    }

    const onClick = (e: React.FormEvent) => {
        createSheet(sheetName).then(r => {
            if (!r){
                alert("Error")
            }
        })
        e.preventDefault()
    }

    return <Dialog open={open} onClose={onClose}>
        <Card sx={{p: 2}}>
            <form onSubmit={onClick}>
                <Grid container direction={"column"} alignItems={"center"} gap={2}>
                    <Typography variant={"h6"}>Create Sheet</Typography>
                    <TextField value={sheetName} onChange={onChange} label={"Sheet Name"}/>
                    <Button type={"submit"} variant={"contained"} sx={{alignSelf: "stretch"}}>OK!</Button>
                </Grid>
            </form>
        </Card>
    </Dialog>
}