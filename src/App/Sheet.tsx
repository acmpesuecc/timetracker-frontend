import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useSheetInfo from "../hooks/useSheetInfo";
import {EventType, NRecord} from "../gql/graphql";
import {Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import usePunch from "../hooks/usePunch";

function TimeDisplay({time}: { time: number }) {
    const d = new Date(time * 1000)
    return <Typography width={"fit-content"}>{d.toLocaleString()}</Typography>
}

function DurationDisplay({dur}: { dur: number }) {
    const hours = ((dur - (dur % 3600)) / 3600).toString()
                                               .padStart(2, "0")
    const minutes = (((dur % 3600) - (dur % 60)) / 60).toString()
                                                      .padStart(2, "0")
    const seconds = (dur % 60).toString().padStart(2, "0")

    return <Typography>{`${hours}:${minutes}:${seconds}`}</Typography>
}

function SheetDisplay({_records: __records, hasEnded}: { _records: NRecord[], hasEnded: boolean }) {
    let [_records, set_records] = useState(__records.map(r => r))
    const records: NRecord[][] = []
    useEffect(() => {
        if (!hasEnded){
            const t = setInterval(() => {

                set_records(s => {
                    return [...s.slice(0, -1), ({event: EventType.End, time: (Math.floor((new Date).getTime() / 1000)), id: "",})]
                })
            }, 1000)
            return () => {
                clearInterval(t)
            }
        } else {
            return () => {}
        }
    }, [__records, hasEnded])
    let tmp: NRecord[] = []
    for (const nRecord in _records) {
        tmp.push(_records[nRecord])
        if (tmp.length === 2) {
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
            {records.map(r => {
                if (r.length == 1) {
                    return <TableRow key={r[0].id + r[1].id}>
                        <TableCell><TimeDisplay time={r[0].time}/></TableCell>
                        <TableCell><TimeDisplay time={r[1].time}/>*</TableCell>
                        <TableCell><DurationDisplay dur={r[1].time - r[0].time}/></TableCell>
                    </TableRow>
                }
                return <TableRow key={r[0].id + r[1].id}>
                    <TableCell><TimeDisplay time={r[0].time}/></TableCell>
                    <TableCell><TimeDisplay time={r[1].time}/></TableCell>
                    <TableCell><DurationDisplay dur={r[1].time - r[0].time}/></TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
}

export default function Sheet() {
    const params = useParams()
    const id = params["id"] as string
    const sheet = useSheetInfo(id)
    const punch = usePunch(id)
    if (!sheet || !(sheet.records)) {
        return <Typography>Well, that's embarrassing.</Typography>
    }
    const ocf = () => {
        punch()
            .then(r => {
                if (!r) {
                    alert("Error punching")
                }
            })
    }
    return <Grid container alignItems={"center"} direction={"column"} gap={2}>
        <Typography variant={"h3"}>{sheet?.summary?.name}</Typography>
        <SheetDisplay _records={sheet.records} hasEnded={sheet.hasEnded} key={sheet.hasEnded ? "truee" : "falsy"}/>
        <Button variant={"contained"} onClick={ocf}>Punch {sheet.hasEnded ? "In" : "Out"}</Button>
    </Grid>
}