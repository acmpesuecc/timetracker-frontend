import {Grid, Typography} from "@mui/material";
import useSheets from "../hooks/useSheets";

export default function App(){
    const sheets = useSheets()
    return <Grid container>
        {
            sheets.map((sh, i) => {
                return <Grid key={i}>
                    <Typography>{sh.name}</Typography>
                </Grid>
            })
        }
    </Grid>
}