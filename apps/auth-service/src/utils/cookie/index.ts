import { Response } from "express";

export const setCookie = (res: Response, name: string, value: string) => {
    res.cookie(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
}