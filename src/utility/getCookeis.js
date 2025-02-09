'use client'
import { useGetCookie } from "cookies-next";

export const getCookie = (name) => {

    // const value = `; ${document.cookie}`;
    // const parts = value.split(`; ${name}=`);
    // if (parts.length === 2) return parts.pop().split(';').shift();
    // return null;  // Returns null if the cookie is not found
    // const cookie = do

    const cookie = useGetCookie(name)
    console.log(cookie);
    return cookie;
  };