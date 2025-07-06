"use client";

import { useEffect, useState } from "react";
import { store } from "./store";

import { Provider } from "react-redux";

export const StoreProvider = ({ children }: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    return (
        <html lang="en" data-theme={theme} suppressHydrationWarning>
            <Provider store={store}>{children}</Provider>
        </html>
    );
};