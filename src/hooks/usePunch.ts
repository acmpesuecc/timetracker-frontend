import {useMutation} from "@apollo/client";
import {DO_PUNCH, GET_SHEET_INFO} from "./queries";

export default function (sheetId: string){
    const [mutateFunction]  = useMutation(DO_PUNCH, {
        refetchQueries: [GET_SHEET_INFO],
        variables:{sheetId: sheetId}
    })
    return async () => {
        try {
            const rv = await mutateFunction()
            return !!rv;
        } catch (e) {
            console.log(e)
            return false
        }
    }
}