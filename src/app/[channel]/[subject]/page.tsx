"use client";

import { getCheatSheet, getTopics } from "@/actions/Actions";
import CSBar from "@/app/components/cheatSheet/CSBar";
import CSWidget from "@/app/components/cheatSheet/CSWidget";
import Topic from "@/app/components/topic/Topic";
import { channelReducer } from "@/store/channelSlice";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubjectPage =  () => {
    const dispatch = useDispatch();
    const Pathname = usePathname();
    const currentChannelID = Pathname.split("/")[1].split("-").at(-1);
    const currentSubjectID = Pathname.split("/")[2].split("-").at(-1);    

    // Getting Channel List from store
    const ChannelList = useSelector((state: RootState) => state.channelList.value);

    useEffect(() => {

        const fetchData = async (channelId: string, subjectId: string) => {
            let fetchedTopics:Topic[] = [];
            let fetchedCheatSheet: CheatSheet[] = [];
            try {
                fetchedTopics = await getTopics(subjectId);
                fetchedCheatSheet = await getCheatSheet(subjectId);
            } catch (err) {
                console.error("Failed to fetch topics:", err);
            } finally {
                const newChannelList = ChannelList.map(channel => {
                    if (channel.id === channelId) {
                        const newChannel = { ...channel };

                        if (newChannel.subjects) {
                            // Create a new subjects array for the channel
                            newChannel.subjects = newChannel.subjects.map(subject => {
                                if (subject.id === subjectId) {
                                    // Create a new subject object if it's the target subject
                                    return { ...subject, topics: fetchedTopics, cheatSheet: fetchedCheatSheet };
                                }
                                return subject; // Return untouched subject
                            });
                        }

                        return newChannel;
                    }
                    return channel;
                });
                
                dispatch(channelReducer({ value: newChannelList }));
            }
        }
        
        const currentChannel = ChannelList.filter(channel => channel.id === currentChannelID)[0];
        const currentSubject = currentChannel?.subjects?.filter(subject => subject.id === currentSubjectID)[0];

        if (currentSubject) {
            if (currentSubject.topics) {
                // do nothing
            } else {
                // if topics are not already present in the store, fetch them
                const channelId = currentChannel.id;
                const subjectId = currentSubject.id;
                fetchData(channelId, subjectId);
            }
        }
        
    },[ChannelList]);


    return (
        <>
            <Topic />
            <div className="drawer drawer-end">
                <input id="my-drawer-cs" type="checkbox" className="drawer-toggle" />
                <label htmlFor="my-drawer-cs">
                    <CSWidget />
                </label>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-cs" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
                        <CSBar />
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SubjectPage;