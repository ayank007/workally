"use client";

import { StoreProvider } from "./StoreProvider";
import { themeReducer } from "./themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

const StoreProvider2 = ({ children }: {children: React.ReactNode}) => {
    
    const theme = useSelector((state: any) => state.uiTheme.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            dispatch(themeReducer({ value: storedTheme }));
        } else {
            dispatch(themeReducer({ value: "dark" }));
        }
    }, [theme]);

    return (
        <html lang="en" data-theme={theme} suppressHydrationWarning>
            {children}
        </html>
    );
}

export default StoreProvider2;