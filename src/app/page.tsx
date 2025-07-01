"use client";

import { useSelector } from "react-redux";
import ChannelTab from "./components/channel/ChannelTab";
import { StringToURL } from "./actions/StringToURL";

export default async function Home() {
  const channelList = useSelector((state:any)=>state.channels)
  return (
    <div>
      <h1>Welcome to Work Ally</h1>
      <div className="channels">
        {channelList.map((channel:any)=>{
            return (<div key={channel.id}>
                <ChannelTab url={"" + StringToURL(channel.title)} name={channel.title} />
            </div>)
        })}
      </div>
    </div>
  );
}
