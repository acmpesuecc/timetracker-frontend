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

import { useContext } from "react";
import { UpdateAuthContext } from "../authContext";
import { useMutation } from "@apollo/client";
import { DO_LOGIN } from "./queries";
import Cookies from "universal-cookie";

export default function useLogin() {
  const update = useContext(UpdateAuthContext);
  const [mutateFunction] = useMutation(DO_LOGIN);
  return async (username: string, password: string) => {
    try {
      const result = await mutateFunction({
        variables: { username, password },
      });
      if (result.data?.Login) {
        update(result.data.Login);
        const cookies = new Cookies();
        cookies.set("ath", result.data.Login, { maxAge: 31536000 });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
