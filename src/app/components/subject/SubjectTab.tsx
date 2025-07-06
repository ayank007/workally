"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubjectTab = ({url="#", name} : {url: string, name: string}) => {
    
    const pathname = usePathname();
    const isActive = pathname === "/" + url;
    
    return (
        <Link href={url} className={`${isActive ? "pointer-events-none active-subject" : ""} subject bg-neutral w-56 h-10 flex items-center justify-center text-base hover:scale-105 duration-150 transition ease-in mb-2 text-base-content rounded-lg`}>
            {name}
        </Link>
    );
}

export default SubjectTab;