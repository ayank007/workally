"use client";

import CodeBlock from "../utils/CodeBlock";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";

const CSBar = () => {

    
    const Pathname = usePathname();
    const channelId = Pathname.split("/")[1].split("-").at(-1) || "";
    const subjectId = Pathname.split("/")[2].split("-").at(-1) || "";
    const channelList = useSelector((state: RootState) => state.channelList.value);
    const CSList = channelList.filter(channel => channel.id === channelId)[0]?.subjects?.filter(subject => subject.id === subjectId)[0]?.cheatSheet || [];
    
    console.log(CSList);

    return (
        <div className="CSBar">
            {
                CSList.length == 0 ? (<div className="text-center w-full text-lg mt-2">No Cheat Sheet Available for This Subject</div>) :
                CSList.map((item: any) => {
                    return (
                        <div className="codeBlock w-full mb-5 px-1.5 rounded-lg" key={item.id}>
                            <h4 className="capitalize text-base font-500 text-base-content pb-2 mb-3 border-b border-dashed border-base-content">{item.title}</h4>
                            <CodeBlock code={item.content} language="markdown" />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default CSBar;