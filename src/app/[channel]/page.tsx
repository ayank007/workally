"use client";

import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import SubjectTab from "../components/subject/SubjectTab";
import { StringToURL } from "@/actions/StringToURL";

const Subject =  () => {
    const Pathname = usePathname();
    const currentChannelID = Pathname.split("/")[1].split("-").at(-1);

    // Getting Channel List from store
    const ChannelList = useSelector((state: RootState) => state.channelList.value);
    const currentChannel = ChannelList.filter(channel => channel.id === currentChannelID)[0];

    if (currentChannel == undefined) return (<div>Loading Channels, please wait</div>);

    const currentSubjectList = currentChannel?.subjects || [];
    return (
        <>
            <h1>You are viewing channel {currentChannel.title}</h1>
            <p>Select a Subject</p>
            <div className="flex mt-3 justify-center gap-3">
                {currentSubjectList.map((subject:Subject)=>{
                    const url = Pathname + "/" + StringToURL(subject.title) + "-" + subject.id;
                    
                    return (<div key={subject.id}>
                        <SubjectTab url={url} name={subject.title} />
                    </div>)
                })
                }
            </div>
        </>
    );
}

export default Subject;