"use client";

const Subject =  (
    {params} : {params : {channel: string}}
) => {
    const {channel} = params;
    return (
        <div>
            you are in channel {channel}
        </div>
    );
}

export default Subject;