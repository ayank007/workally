"use client";

import { themeReducer } from "@/store/themeSlice";
import { useEffect, useRef, useState } from "react";
import { BsValentine } from "react-icons/bs";
import { FaCoffee } from "react-icons/fa";
import { GiWindHole } from "react-icons/gi";
import { IoMdMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const ThemeSelector = () => {
    const dispatch = useDispatch();

    const onThemeChange = (e: string) => {
        try {
            localStorage.setItem("theme", e);
            dispatch(themeReducer({ value: e }));
        } catch (error) {
            console.log(error);
        }
    };

    const modalRef = useRef<any>(null);
    const openModal  = () => {
        modalRef.current?.showModal();
    }

    return (
        <>
            <button className="btn z-10" onClick={openModal}>Theme</button>

            <dialog id="themeSelectorModal" className="modal text-center" ref={modalRef}>
                <div className="modal-box bg-base-100 p-8 rounded-box z-20 w-96 max-w-11/12 shadow-sm  sm:modal-middle">
                    <h2>Select a Theme</h2>
                    <div className="divider divider-base w-full mt-1.5"></div>
                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <ul className="flex1 gap-4 flex-wrap">
                        <li><a className="btn btn-primary theme dark" onClick={()=>onThemeChange("dark")}><IoMdMoon /></a></li>
                        <li><a className="btn btn-primary theme light" onClick={()=>onThemeChange("light")}><MdLightMode /></a></li>
                        <li><a className="btn btn-primary theme abyss" onClick={()=>onThemeChange("abyss")}><GiWindHole /></a></li>
                        <li><a className="btn btn-primary theme valentine" onClick={()=>onThemeChange("valentine")}><BsValentine /></a></li>
                        <li><a className="btn btn-primary theme coffee" onClick={()=>onThemeChange("coffee")}><FaCoffee /></a></li>
                    </ul>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default ThemeSelector;