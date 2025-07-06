"use client";
import { ImCool } from "react-icons/im";

const CSWidget = () => {
    return (
        <div className="CSWidget flex1 fixed bottom-5 right-5 btn-neutral btn cursor-pointer hover:scale-110 transition ease-in duration-150 text-base-content rounded-full w-14 h-14 flex items-center justify-center text-2xl">
            <ImCool />
        </div>
    );
}

export default CSWidget;