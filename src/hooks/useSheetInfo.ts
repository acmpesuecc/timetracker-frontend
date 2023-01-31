import {useQuery} from "@apollo/client";
import {GET_SHEET_INFO} from "./queries";
import {useEffect} from "react";

export default function useSheetInfo(id: string){
    const {loading, data, error, startPolling, stopPolling} = useQuery(GET_SHEET_INFO, {variables: {sheetId: id}})
    useEffect(() => {
        startPolling(5000)
        return () => {
            stopPolling()
        }
    })
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