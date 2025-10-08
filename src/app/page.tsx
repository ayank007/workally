"use client";

import { useSelector } from "react-redux";
import ChannelTab from "./components/channel/ChannelTab";
import { StringToURL } from "../actions/StringToURL";
import { RootState } from "@/store/store";

export default function Home() {
  // channelList coming from Store
  const channels = useSelector((state:RootState)=>state.channelList.value);
  return (
    <div>
      <h1>Welcome to Work Ally</h1>
      <div className="channels flex gap-2 justify-center flex-wrap mt-4">
        {channels.length == 0 ? (
          <div>No Channels Added</div>
        ) : (
          <>
            {
              channels.map((channel: any)=>{
                const url = "/" + StringToURL(channel.title) + "-" + channel.id;
                  return (
                    <ChannelTab key={channel.id} url={"/" + channel.id} name={channel.title} />
                  );
              })
            }
            <ChannelTab key={"tools"} url={"/tools"} name={"Tools"} />
          </>
        )}
      </div>
    </div>
  );
}
