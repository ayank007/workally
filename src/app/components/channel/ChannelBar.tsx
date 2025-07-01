"use client";

import Link from "next/link";
import ChannelTab from "./ChannelTab";
import { StringToURL } from "@/app/actions/StringToURL";

function ChannelBar ({props}:any) {
    const ChannelList = props.ChannelList;
    return (
        <>
            {ChannelList.length == 0 ? (
                <div>No Channels Added</div>
            ) : (
                <div id="ChannelBar" className="channelBar bg-[#1E1F22] text-white w-20 flex items-center gap-2 flex-col py-4">
                    <>
                        {ChannelList.map((channel:any)=>{
                            return (<div key={channel.id}>
                                <ChannelTab url={"" + StringToURL(channel.title) + channel.id} name={channel.title} />
                            </div>)
                        })}
                    </>
                </div>
            )}
            <div className="profileSection w-72 h-auto left-20 bottom-0 fixed bg-[#232428] z-40">
                <Link href="/profile" className="p-2 flex items-center gap-4">
                    <ChannelTab name="A" url="#" />
                    <div className="userName">Darkseid</div>
                </Link>
            </div>
        </>
    );
}

export default ChannelBar;