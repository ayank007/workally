"use client";

const Subject =  (
    {params} : {params : {channel: string}}
) => {
    const {channel} = params;
    return (
        <>
            <h1>You are viewing channel {channel}</h1>
            <p>Select a Subject</p>
        </>
    );
}

export default Subject;