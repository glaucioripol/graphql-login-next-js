import Cookies, { CookieAttributes } from "js-cookie";

import { configurations } from "shared/configs";
import { CookiesKeys } from "shared/types";

const set = (name: CookiesKeys, value: string) =>
  Cookies.set(
    name,
    value,
    configurations.client.cookies.options as CookieAttributes
  );

const get = (name: CookiesKeys) => Cookies.get(name);

const clear = (name: CookiesKeys) => Cookies.remove(name);

export const cookies = { set, get, clear };
