import {useContext} from "react";
import {UpdateAuthContext} from "../authContext";
import {useMutation} from "@apollo/client";
import {LOGIN} from "./queries";

export default function useLogin() {
    const update = useContext(UpdateAuthContext)
    const [mutateFunction] = useMutation(LOGIN)
    return (username: string, password: string) => {
        mutateFunction({variables: {username, password}})
            .then(result => {
                if (result.data?.Login) {
                    update(result.data.Login)
                }
            })
            .catch((reason) => {
                console.log(reason)
            })
    }
}