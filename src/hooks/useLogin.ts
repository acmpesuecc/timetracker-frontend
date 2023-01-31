import {useContext} from "react";
import {UpdateAuthContext} from "../authContext";
import {useMutation} from "@apollo/client";
import {DO_LOGIN} from "./queries";
import Cookies from "universal-cookie";

export default function useLogin() {
    const update = useContext(UpdateAuthContext)
    const [mutateFunction] = useMutation(DO_LOGIN)
    return async (username: string, password: string) => {
        try {
            const result = await mutateFunction({variables: {username, password}})
            if (result.data?.Login) {
                update(result.data.Login)
                const cookies = new Cookies
                cookies.set("ath", result.data.Login, {maxAge: 7200})
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }
}