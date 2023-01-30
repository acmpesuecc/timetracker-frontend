import {useQuery} from "@apollo/client";
import {GET_SHEETS} from "./queries";

export default function useSheets() {
    const { loading, error, data }  = useQuery(GET_SHEETS)
    if (loading){
        return []
    } else if (error){
        throw error
    } else if (data && data.Sheets){
        return data.Sheets
    } else {
        return []
    }
}