"use client";

import { getSubjects } from "@/actions/Actions";
import ChannelTab from "./ChannelTab";
import { StringToURL } from "@/actions/StringToURL";
import { channelReducer } from "@/store/channelSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { FaTools } from "react-icons/fa";

function ChannelBar ({ChannelList}:{ChannelList:Channel[]}) {

    const dispatch = useDispatch();
    useEffect( () => {
        let updatedChannelList = [...ChannelList];
        const fetchSubjectsData = async () => {
            try {
                for(let i=0;i<updatedChannelList.length;i++) {
                    const channel = { ...updatedChannelList[i] };
                    const subjects = await getSubjects(channel.id);
                    
                    channel.subjects = subjects;
                    updatedChannelList[i] = channel;
                }
            } catch (err) {
                console.log("Error: " + err);
                for(let i=0;i<updatedChannelList.length;i++) {
                    const channel = { ...updatedChannelList[i] };
                    channel.subjects = [];
                    updatedChannelList[i] = channel;
                }
            } finally {
                dispatch(channelReducer({ value: updatedChannelList }));
            }
        };
        if (ChannelList && ChannelList.length > 0) {
            fetchSubjectsData();
        }

    }, [ChannelList, dispatch]);
    
    return (
        <ul className="menu bg-base-300 text-base-content min-h-full p-3 flex flex-col overflow-x-hidden overflow-y-auto flex-nowrap">
            <>{
                ChannelList.map((channel:Channel)=>{
                    return(
                        <li key={channel.id}>
                            <ChannelTab url={"/" + channel.id} name={channel.title} />
                        </li>
                    );
                })
            }</>
            <li key={"tools"}>
                <ChannelTab url={"/tools"} name={"Tools"} icon={true}>
                    <FaTools />
                </ChannelTab>
            </li>
            <li className="mt-auto">
                <ChannelTab url="/dashboard" name="&#9827;" />
            </li>
            <li className="last-channel mb-0">
                <ChannelTab url="/profile" name="AK" />
            </li>
        </ul>
    );
}

export default ChannelBar;