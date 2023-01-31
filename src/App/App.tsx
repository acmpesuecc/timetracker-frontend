import {Box, Card, Grid, Typography} from "@mui/material";
import useSheets from "../hooks/useSheets";
import {useNavigate} from "react-router-dom";
import {Sheet} from "../gql/graphql";

export default function App(){
    const sheets = useSheets()
    const navigate = useNavigate()
    const ocf = (id: string) => {
        const url = `/sheets/${id}`
        navigate(url)
    }
    return <Box m={2} p={2}>
        <Typography variant={"h1"}>Your Sheets</Typography>
        <Grid container p={2} m={2}>
            {
                sheets.map((sh: Sheet) => {
                    const oc = () => {
                        ocf(sh.id)
                    }
                    return <Grid key={sh.id}>
                        <Card sx={{p: 2}} onClick={oc}>
                            <Typography>{sh.name}</Typography>
                        </Card>
                    </Grid>
                })
            }
        </Grid>
    </Box>
}