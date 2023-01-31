
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