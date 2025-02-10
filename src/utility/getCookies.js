'use client';

import { getCookies } from "cookies-next";

export function getCookie(cookieName) {
    return getCookies(cookieName)
}