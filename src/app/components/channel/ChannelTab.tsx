"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ChannelTab = ({url="#", name, icon=false, children} : {url?: string, name: string, icon?: boolean, children?:React.ReactNode}) => {
    
    const pathname = usePathname();
    const isActive = pathname ===  "/" + url;    

    return (
        <Link href={url} className={`${isActive ? "pointer-events-none active-channel bg-neutral-700" : "bg-neutral"} channel rounded-full w-12 h-12 flex items-center justify-center font-medium uppercase text-base transition hover:scale-110 duration-150 ease-in mb-2 text-neutral-content`}>
            {icon ? children : name.substring(0, 4)}
        </Link>
    );
}

export default ChannelTab;