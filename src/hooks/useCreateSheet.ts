import {useMutation} from "@apollo/client";
import {DO_CREATE_SHEET, GET_SHEETS} from "./queries";

export default function useCreateSheet(){
    const [mutateFunction] = useMutation(DO_CREATE_SHEET, {refetchQueries: [GET_SHEETS]})
    return (name: string) => {
        const month = (new Date).getMonth() + 1
        const year = (new Date).getFullYear()
        return mutateFunction({variables: {month, year, sheetName: name}}).then(r => {
            return !!r
        }).catch(e => {
            console.log(e)
            return false;
        })
    }
}