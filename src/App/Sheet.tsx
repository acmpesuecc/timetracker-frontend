import {useParams} from "react-router-dom";
import React from "react";
import useSheetInfo from "../hooks/useSheetInfo";
import {NRecord} from "../gql/graphql";
import {Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

function TimeDisplay({time}: {time: number}) {
    const d = new Date(time * 1000)
    return <Typography width={"fit-content"}>{d.toLocaleString()}</Typography>
}
function DurationDisplay({dur}: { dur: number }) {
    const hours = ((dur - (dur % 3600)) / 3600).toString().padStart(2, "0")
    const minutes = (((dur % 3600) - (dur % 60)) / 60).toString().padStart(2, "0")
    const seconds = (dur % 60).toString().padStart(2, "0")

    return <Typography>{`${hours}:${minutes}:${seconds}`}</Typography>
}

function SheetDisplay({_records}: {_records: NRecord[]}){
    const records: NRecord[][] = []
    let tmp: NRecord[] = []
    console.log(_records)
    for (const nRecord in _records) {
        tmp.push(_records[nRecord])
        if (tmp.length === 2){
            records.push(tmp)
            tmp = []
        }
    }
    return <Table sx={{width: "60vw"}}>
        <TableHead>
            <TableRow>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Time</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                records.map(r => {
                    console.log(r)
                    return <TableRow key={r[0].id + r[1].id}>
                        <TableCell><TimeDisplay time={r[0].time}/></TableCell>
                        <TableCell><TimeDisplay time={r[1].time}/></TableCell>
                        <TableCell><DurationDisplay dur={r[1].time - r[0].time}/></TableCell>
                    </TableRow>
                })
            }
        </TableBody>
    </Table>
}
export default function Sheet(){
    const params = useParams()
    const id = params["id"] as string
    const sheet = useSheetInfo(id)
    if (!sheet){
        return <Typography>Well, that's embarrassing.</Typography>
    }
    return <Grid container alignItems={"center"} direction={"column"} gap={2}>
        <Typography variant={"h3"}>{sheet?.summary?.name}</Typography>
        <SheetDisplay _records={sheet?.records}/>
        <Button variant={"contained"}>Punch {sheet.hasEnded ? "In" : "Out"}</Button>
    </Grid>
}