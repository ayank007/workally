"use client";

import { useEffect, useState } from "react";
import { BsValentine } from "react-icons/bs";
import { FaCoffee } from "react-icons/fa";
import { GiWindHole } from "react-icons/gi";
import { IoMdMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";

const ThemeSelector = () => {
    const [theme, setTheme] = useState("dark");
    
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    const onThemeChange = (e: string) => {
        localStorage.setItem("theme", e);
    };
    return (
        <>
            <details className="dropdown">
                <summary className="btn m-1">Theme</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a onClick={()=>onThemeChange("dark")}><IoMdMoon /></a></li>
                    <li><a onClick={()=>onThemeChange("light")}><MdLightMode /></a></li>
                    <li><a onClick={()=>onThemeChange("abyss")}><GiWindHole /></a></li>
                    <li><a onClick={()=>onThemeChange("valentine")}><BsValentine /></a></li>
                    <li><a onClick={()=>onThemeChange("coffee")}><FaCoffee /></a></li>
                </ul>
            </details>
        </>
    );
};

export default ThemeSelector;