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

import { useMutation } from "@apollo/client";
import { DO_PUNCH, GET_SHEET_INFO } from "./queries";

export default function (sheetId: string) {
  const [mutateFunction] = useMutation(DO_PUNCH, {
    refetchQueries: [GET_SHEET_INFO],
    variables: { sheetId: sheetId },
  });
  return async () => {
    try {
      const rv = await mutateFunction();
      return !!rv;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
