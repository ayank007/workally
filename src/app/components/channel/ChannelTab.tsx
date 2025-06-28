"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ChannelTab = ({url="#", name} : {url: string, name: string}) => {
    const pathname = usePathname();
    const isActive = pathname ===  url;
    
    return (
        <div>
            {url === "#" ?
            (<div className={`channel rounded-full w-12 h-12 bg-[#000] flex items-center justify-center font-medium uppercase text-lg`}>
                {name}
            </div>) :
            (<Link href={url} className={`${isActive ? "pointer-events-none bg-black active-channel" : "bg-gray-900"} relative channel rounded-full w-12 h-12 flex items-center justify-center font-medium uppercase text-lg hover:scale-110 duration-150 ease-in`}>
                {name.substring(0, 3)}
            </Link>)}
        </div>
    );
}

export default ChannelTab;