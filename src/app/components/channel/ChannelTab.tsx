"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ChannelTab = ({url="#", name} : {url: string, name: string}) => {
    
    const pathname = usePathname();
    const isActive = pathname ===  "/" + url;    
    
    return (
        <Link href={url} className={`${isActive ? "pointer-events-none active-channel bg-neutral-700" : "bg-neutral"} channel rounded-full w-12 h-12 flex items-center justify-center font-medium uppercase text-base transition hover:scale-110 duration-150 ease-in mb-2 text-base-content`}>
            {name.substring(0, 4)}
        </Link>
    );
}

export default ChannelTab;