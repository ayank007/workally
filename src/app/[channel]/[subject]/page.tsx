"use client";

const Topic =  (
    {params} : {params : {channel: string, subject: string}}
) => {
    const {channel, subject} = params;
    return (
        <div>
            you are in channel {channel} and subject {subject}
        </div>
    );
}

export default Topic;