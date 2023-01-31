import {Box, Button, Card, Grid, Typography} from "@mui/material";
import useSheets from "../hooks/useSheets";
import {useNavigate} from "react-router-dom";
import {Sheet} from "../gql/graphql";
import React, {useState} from "react";
import {Add} from "@mui/icons-material";
import AddSheetModal from "./AddSheetModal";

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
        <Box m={2} p={2}>
            <Typography variant={"h1"}>Your Sheets</Typography>
            <Grid container p={2} m={2} gap={2} alignItems={"stretch"}>
                {
                    sheets.map((sh: Sheet) => {
                        const oc = () => {
                            ocf(sh.id)
                        }
                        return <Grid key={sh.id}>
                            <Card onClick={oc} sx={{height: "100%"}}>
                                <Grid container p={2} height={"100%"} alignItems={"center"}>
                                    <Typography>{sh.name}</Typography>
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
        </Box>
        <AddSheetModal open={createSheet} setOpen={setCreateSheet}/>
    </>
}