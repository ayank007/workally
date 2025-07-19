"use client";

import { useEffect, useState } from "react";
import CodeBlock from "../utils/CodeBlock";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";

const Topic = ({loading}:{loading: boolean}) => {
    
    const Pathname = usePathname();
    const channelId = Pathname.split("/")[1].split("-").at(-1) || "";
    const subjectId = Pathname.split("/")[2].split("-").at(-1) || "";
    const channelList = useSelector((state: RootState) => state.channelList.value);
    const subjectTitle = channelList.filter(channel => channel.id === channelId)[0]?.subjects?.filter(subject => subject.id === subjectId)[0]?.title || "";
    const TopicList = channelList.filter(channel => channel.id === channelId)[0]?.subjects?.filter(subject => subject.id === subjectId)[0]?.topics || [];    
    
    const [currTopic, setCurrTopic] = useState<Topic>();

    useEffect(() => {
        setCurrTopic(TopicList[0]);
        
    }, [TopicList]);

    useEffect(()=>{
        console.log(currTopic);
        
    }, [currTopic]);

    if (currTopic == undefined || (loading && TopicList.length == 0)) {
        return <div>Topics are loading, please wait!</div>;
    } else if (TopicList.length == 0) {
        return <div>No Topics Available for this Subject </div>;
    } else {
        return (
            <>
                <br />
                <h1>{subjectTitle}</h1>
                <div className="divider divider-base"></div>
                <h2 className="w-full text-left px-4 md:px-8">{currTopic.title}</h2>
                <div className="codeBlock w-full px-3.5 md:px-8 mt-4">
                    <CodeBlock code={currTopic.code} language="java" />
                </div>
                <div className="flex gap-4 gap-y-0 mt-4 w-full px-3.5 md:px-8 flex-wrap md:flex-nowrap">
                    <div className="codeBlock testcase w-full md:w-[calc(50%-8px)]">
                        <CodeBlock code={currTopic.description} language="markdown" />
                    </div>
                    <div className="codeBlock testcase w-full md:w-[calc(50%-8px)]">
                        <CodeBlock code={currTopic.testcase} language="markdown" />
                    </div>
                </div>
                <div className="divider divider-base"></div>
                <div className="flex gap-4 topicBar mt-8 flex-wrap justify-center">
                    {TopicList.map((topic: Topic)=>{
                        return (
                            <div key={topic.id} 
                                className="topicTab h-auto w-80 max-w-full cursor-pointer hover:scale-105 transition ease-in duration-150 btn btn-primary rounded-md p-2" 
                                onClick={()=>{setCurrTopic(topic)}}>
                                {topic.title}
                            </div>
                        );
                    })}
                </div>
                <br />
                <br />
                <p>Website Made With Love</p>
                <br />
            </>
        );
    }
}

export default Topic;