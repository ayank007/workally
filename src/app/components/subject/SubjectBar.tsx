"use client";

import { RootState } from "@/store/store";
import SubjectList from "./SubjectList";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { tools } from "@/store/tools";

function SubjectBar () {
    const Pathname = usePathname();
    const currentChannel = Pathname.split("/")[1];

    if (currentChannel == "tools") {
        return (
            <SubjectList SubjectList={tools} />
        );
    }

    // Getting Channel List from store
    const ChannelList = useSelector((state: RootState) => state.channelList.value);
    
    const currentSubjectList = ChannelList.filter(channel => channel.id === currentChannel)[0]?.subjects || [];
    // console.log(currentSubjectList);
    
    return <SubjectList SubjectList={currentSubjectList} />
    
    // Fetching subjects
    // useEffect(() => {
    //     const fetchSubjectsData = async () => {
    //         if (currentChannel && ChannelList.some(channel => channel.id === currentChannel)) {

    //             try {
    //                 const fetchedSubjects = await getSubjects(currentChannel);
    //                 console.log(fetchedSubjects);
                    
    //                 setSubjects(fetchedSubjects);
    //             } catch (err) {
    //                 console.error("Failed to fetch subjects:", err);
    //                 setSubjects([]);
    //             }
    //             setChannelValidity(true);
    //         } else {
    //             setChannelValidity(false);
    //         }
    //     };
    //     fetchSubjectsData();
    // }, [currentChannel, ChannelList]);

    
}

export default SubjectBar;