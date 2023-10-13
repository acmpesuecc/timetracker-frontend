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

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import useSheetInfo from "../hooks/useSheetInfo";
import { NRecord } from "../gql/graphql";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import usePunch from "../hooks/usePunch";
import isLoggedIn from "../hooks/isLoggedIn";
import Cookies from "universal-cookie";

function TimeDisplay({ time }: { time: number }) {
  const d = new Date(time * 1000);
  return <Typography width={"fit-content"}>{d.toLocaleString()}</Typography>;
}

function DurationDisplay({ dur, variant }: { dur: number; variant?: "h5" }) {
  const hours = ((dur - (dur % 3600)) / 3600).toString().padStart(2, "0");
  const minutes = (((dur % 3600) - (dur % 60)) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (dur % 60).toString().padStart(2, "0");

  return (
    <Typography
      variant={variant}
    >{`${hours}:${minutes}:${seconds}`}</Typography>
  );
}

function SheetDisplay({ _records }: { _records: NRecord[] }) {
  const records: NRecord[][] = [];
  let tmp: NRecord[] = [];
  for (const nRecord in _records) {
    tmp.push(_records[nRecord]);
    if (tmp.length === 2) {
      records.push(tmp);
      tmp = [];
    }
  }

  return (
    <Table sx={{ width: "60vw" }}>
      <TableHead>
        <TableRow>
          <TableCell>Start</TableCell>
          <TableCell>End</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map((r) => {
          if (r.length == 1) {
            return (
              <TableRow key={r[0].id + r[1].id}>
                <TableCell>
                  <TimeDisplay time={r[0].time} />
                </TableCell>
                <TableCell>
                  <TimeDisplay time={r[1].time} />*
                </TableCell>
                <TableCell>
                  <DurationDisplay dur={r[1].time - r[0].time} />
                </TableCell>
              </TableRow>
            );
          }
          return (
            <TableRow key={r[0].id + r[1].id}>
              <TableCell>
                <TimeDisplay time={r[0].time} />
              </TableCell>
              <TableCell>
                <TimeDisplay time={r[1].time} />
              </TableCell>
              <TableCell>
                <DurationDisplay dur={r[1].time - r[0].time} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default function Sheet() {
  const params = useParams();
  const id = params["id"] as string;
  const sheet = useSheetInfo(id);
  const punch = usePunch(id);
  const n = useNavigate();

  if (!sheet || !sheet.records) {
    return <Typography>Well, that's embarrassing.</Typography>;
  }
  const ocf = () => {
    if (!isLoggedIn()) return n("/");

    punch().then((r) => {
      if (!r) {
        alert("Error punching");
      }
    });
  };
  return (
    <Grid container alignItems={"center"} direction={"column"} gap={2}>
      <Typography variant={"h3"}>{sheet?.summary?.name}</Typography>
      <SheetDisplay _records={sheet.records} />
      <Grid container justifyContent={"flex-end"} gap={2} width={"45vw"}>
        <Typography variant={"h5"}>
          <b>Total</b>
        </Typography>
        <DurationDisplay variant={"h5"} dur={sheet.total} />
      </Grid>
      <Button variant={"contained"} sx={{ displayPrint: "none" }} onClick={ocf}>
        Punch {sheet.hasEnded ? "In" : "Out"}
      </Button>
    </Grid>
  );
}
