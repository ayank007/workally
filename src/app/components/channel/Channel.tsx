"use client";

import { useState } from "react";

import ChannelBar from "./ChannelBar";
import { addChannel } from "../../actions/Actions";

const Channel = (ChannelList:any) => {

    const [name, setName] = useState("");

    const addNewChannel = () => {
        try {
            addChannel(name);
        } catch (error) {
            console.log(error);
            throw(error);
        }
    };

    return (
        <div className="pl-80">
            <ChannelBar ChannelList={ChannelList} />
            <div className="w-full flex items-center justify-center">
                <div>
                    <input type="text" name="name" className="nameInp" onChange={(e) => setName(e.target.value)} />
                    <button type="button" onClick={addNewChannel}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Channel;