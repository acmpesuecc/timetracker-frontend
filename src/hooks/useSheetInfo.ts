import {useQuery} from "@apollo/client";
import {GET_SHEET_INFO} from "./queries";

export default function useSheetInfo(id: string){
    const {loading, data, error} = useQuery(GET_SHEET_INFO, {variables: {sheetId: id}})
    if (loading){
        return null
    }
    if (error){
        console.log(error)
        return null
    }
    if (data && data.Sheet){
        return data.Sheet
    }
}