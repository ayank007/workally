"use client";

import { useState, useRef, useEffect } from "react";
import { addChannel, addCheatSheet, addSubject, addTopic, deleteChannel, deleteSubject } from "../../actions/Actions";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { channelReducer } from "@/store/channelSlice";

import './style.scss';

export default function dashboard() {
    const dispatch = useDispatch();

    const channels = useSelector((state:RootState)=>state.channelList.value);

    const channelInpRef = useRef<HTMLInputElement>(null);
    const channelAddBtnRef = useRef<HTMLButtonElement>(null);
    const [name, setName] = useState("");

    async function addChannelHandler () {
        const channelAddBtn = channelAddBtnRef.current!;
        const channelInp = channelInpRef.current!;
        channelAddBtn.classList.add("pointer-event-none");
        channelAddBtn.innerHTML = `Adding <span className="loading loading-dots loading-xs"></span>`;
        try {
            const newChannel: Channel = await addChannel(name);
            dispatch(channelReducer({ value: [...channels, newChannel] }));
            alert("Success");
        } catch (error) {
            console.log(error);
            alert("Failed");
        } finally {
            channelInp.value = "";
            channelAddBtn.classList.remove("pointer-event-none");
            channelAddBtn.innerHTML = "Add";
        }
    };

    const deleteChannelFormRef = useRef<HTMLFormElement>(null);
    async function deleteChannelHandler (e:any) {
        e.preventDefault();
        const id = e.target[0].value;
        console.log("deleting channel: " + id);
        const confirmation = confirm("Are you sure you want to delete this channel?");
        if (!confirmation) {
            return;
        }
        try {
            await deleteChannel(id);
            dispatch(channelReducer({ value: channels.filter((channel: Channel) => channel.id !== id) }));
            alert("Success");
        } catch (error) {
            console.log(error);
            alert("Failed");
        } finally {
            deleteChannelFormRef.current!.reset();
        }
    };

    const subjectFormRef = useRef<HTMLFormElement>(null);
    const addSubjectHandler = (e:any) => {
        e.preventDefault();
        const subjectName = e.target[0].value;
        const channelId = e.target[1].value;
        const subjectAddBtn = e.target[2];
        subjectAddBtn.classList.add("pointer-event-none");
        subjectAddBtn.innerHTML = `Adding <span className="loading loading-dots loading-xs"></span>`;
        try {
            addSubject(subjectName, channelId);
            alert("Success");
        } catch (error) {
            console.log(error);
            alert("Failed");
        } finally {
            subjectFormRef.current!.reset();
            subjectAddBtn.classList.remove("pointer-event-none");
            subjectAddBtn.innerHTML = "Add";
        }
    }

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const setChannelIdForSubjectDeletion = (e:any) => {
        const id = e.target.value;
        const subjectList = channels.filter(channel=>channel.id === id)[0].subjects || [];
        if (subjectList) {
            setSubjects(subjectList);
        }
    }
    
    const deleteSubjectFormRef = useRef<HTMLFormElement>(null);
    const deleteSubjectHandler = (e:any) => {
        e.preventDefault();
        const id = e.target[1].value;
        console.log("deleting subject: " + id);
        const confirmation = confirm("Are you sure you want to delete this subject?");
        if (!confirmation) {
            return;
        }
        try {
            deleteSubject(id);
            alert("Success");
        } catch (error) {
            console.log(error);
            alert("Failed");
        } finally {
            setSubjects([]);
            deleteSubjectFormRef.current!.reset();
        }
    }

    // Adding Topics
    const [subjects1, setSubjects1] = useState<Subject[]>([]);
    const setChannelIdForTopicAddition = (e:any) => {
        const id = e.target.value;
        const subjectList = channels.filter(channel=>channel.id === id)[0].subjects || [];
        if (subjectList) {
            setSubjects1(subjectList);
        }
    }

    const addTopicFormRef = useRef<HTMLFormElement>(null);
    const addTopicHandler = async(e:any) => {
        e.preventDefault();
        const topicName = e.target[2].value;
        const subjectId = e.target[1].value;
        const code = e.target[3].value;
        const description = e.target[4].value;
        const testcase = e.target[5].value;
        const topicAddBtn = e.target[6];
        topicAddBtn.classList.add("pointer-event-none");
        topicAddBtn.innerHTML = `Adding <span className="loading loading-dots loading-xs"></span>`;
        try {
            const topic = await addTopic(topicName, description, testcase, code, subjectId );
            alert("Success");
        } catch (error) {
            console.log(error);
            alert("Failed");
        } finally {
            addTopicFormRef.current!.reset();
            topicAddBtn.classList.remove("pointer-event-none");
            topicAddBtn.innerHTML = "Add";
        }
    }

    // Adding Cheat Sheet
    const [subjects2, setSubjects2] = useState<Subject[]>([]);
    const setChannelIdForCSAddition = (e:any) => {
        const id = e.target.value;
        const subjectList = channels.filter(channel=>channel.id === id)[0].subjects || [];
        if (subjectList) {
            setSubjects2(subjectList);
        }
    }

    const addCSFormRef = useRef<HTMLFormElement>(null);
    const addCSHandler = async(e:any) => {
        e.preventDefault();
        const name = e.target[2].value;
        const subjectId = e.target[1].value;
        const content = e.target[3].value;
        const CSAddBtn = e.target[4];
        CSAddBtn.classList.add("pointer-event-none");
        CSAddBtn.innerHTML = `Adding <span className="loading loading-dots loading-xs"></span>`;
        try {
            const cs = await addCheatSheet(name, content, subjectId );
            alert("Success");
        } catch (error) {
            console.log(error);
            alert("Failed");
        } finally {
            addCSFormRef.current!.reset();
            CSAddBtn.classList.remove("pointer-event-none");
            CSAddBtn.innerHTML = "Add";
        }
    }
    

    return (
        <>
            <h1>Dashboard</h1>
            <div className="divider"></div>
            <div className="cards flex gap-4 justify-center flex-wrap">
                {/* Add Channel Form */}
                <div className="card bg-base-100 w-96 shadow-sm text-center text-base-content">
                    <div className="card-body flex flex-col items-center">
                        <h2 className="card-title">Add a New Channel</h2>
                        <p>A Channel only takes a title. By default it holds no subjects. Keep it very short.</p>
                        <br />
                        
                        <span>Channel Name</span>
                        <input type="text" placeholder="DSA" className="input input-md input-accent" ref={channelInpRef} required onChange={(e) => setName(e.target.value)} />
                        <div className="card-actions flex-col items-center">
                            <button className="btn btn-primary" type="button" ref={channelAddBtnRef} onClick={addChannelHandler}>
                                Add
                            </button>
                            <a href="/" className="body-link link link-secondary">View Channels</a>
                        </div>
                    </div>
                </div>
                
                {/* Add Subject Form */}
                <div className="card bg-base-100 w-96 shadow-sm text-center text-base-content">
                    <div className="card-body">
                        <form ref={subjectFormRef} onSubmit={addSubjectHandler} className="flex flex-col items-center">
                            <h2 className="card-title">Add a New Subject</h2>
                            <br />
                            <span className="mb-1">Subject Name</span>
                            <input type="text" placeholder="Arrays" className="input input-md input-accent" required />
                            <br />
                            <select defaultValue="Pick a Channel" className="select select-accent select-md">
                                <option disabled={true}>Pick a Channel</option>
                                {channels.map((channel:any)=>{
                                    return (
                                        <option value={channel.id} key={channel.id}>{channel.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" type="submit">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Delete Channel Form */}
                <div className="card bg-base-100 w-96 shadow-sm text-center text-base-content">
                    <div className="card-body">
                        <form ref={deleteChannelFormRef} onSubmit={deleteChannelHandler} className="flex flex-col items-center">
                            <h2 className="card-title">Delete a Channel</h2>
                            <div className="divider"></div>
                            <select defaultValue="Pick a Channel" className="select select-error select-md">
                                <option disabled={true}>Pick a Channel</option>
                                {channels.map((channel:any)=>{
                                    return (
                                        <option value={channel.id} key={channel.id}>{channel.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" type="submit">
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Delete Subject Form */}
                <div className="card bg-base-100 w-96 shadow-sm text-center text-base-content">
                    <div className="card-body">
                        <form onSubmit={deleteSubjectHandler} className="flex flex-col items-center">
                            <h2 className="card-title">Delete a Subject</h2>
                            
                            <div className="divider"></div>
                            <select defaultValue="Pick a Channel" className="select select-error select-md" onChange={setChannelIdForSubjectDeletion}>
                                <option disabled={true}>Pick a Channel</option>
                                {channels.map((channel:any)=>{
                                    return (
                                        <option value={channel.id} key={channel.id}>{channel.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            
                            <select defaultValue="Pick a Channel" className="select select-error select-md">
                                <option disabled={true}>Pick a Subject</option>
                                {subjects.map((subject:any)=>{
                                    return (
                                        <option value={subject.id} key={subject.id}>{subject.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" type="submit">
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Add Topic Form */}
                <div className="card bg-base-100 w-96 shadow-sm text-center text-base-content">
                    <div className="card-body">
                        <form ref={addTopicFormRef} onSubmit={addTopicHandler} className="flex flex-col items-center">
                            <h2 className="card-title">Add a New Topic</h2>
                            <div className="divider"></div>
                            <select defaultValue="Pick a Channel" className="select select-accent select-md" onChange={setChannelIdForTopicAddition}>
                                <option disabled={true}>Pick a Channel</option>
                                {channels.map((channel:any)=>{
                                    return (
                                        <option value={channel.id} key={channel.id}>{channel.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <select defaultValue="Pick a Subject" className="select select-accent select-md">
                                <option disabled={true}>Pick a Subject</option>
                                {subjects1.map((subject:any)=>{
                                    return (
                                        <option value={subject.id} key={subject.id}>{subject.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <span className="mb-1.5">Topic Name</span>
                            <input type="text" placeholder="Topic" className="input input-md input-accent" required />
                            <br />
                            <span className="mb-2">Code</span>
                            <textarea className="textarea textarea-accent" name="code" rows={10} placeholder="Type or paste your code here..."></textarea>
                            <br />
                            <span className="mb-2">Description</span>
                            <textarea className="textarea textarea-accent" name="description" rows={5} placeholder="Type or paste your code here..."></textarea>
                            <br />
                            <span className="mb-2">TestCases</span>
                            <textarea className="textarea textarea-accent" name="testcase" rows={5} placeholder="Type or paste your code here..."></textarea>
                            <br />
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" type="submit">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Add CheatSheet Form */}
                <div className="card bg-base-100 w-96 shadow-sm text-center text-base-content">
                    <div className="card-body">
                        <form ref={addCSFormRef} onSubmit={addCSHandler} className="flex flex-col items-center">
                            <h2 className="card-title">Add a New CheatSheet</h2>
                            <div className="divider"></div>
                            <select defaultValue="Pick a Channel" className="select select-accent select-md" onChange={setChannelIdForCSAddition}>
                                <option disabled={true}>Pick a Channel</option>
                                {channels.map((channel:any)=>{
                                    return (
                                        <option value={channel.id} key={channel.id}>{channel.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <select defaultValue="Pick a Subject" className="select select-accent select-md">
                                <option disabled={true}>Pick a Subject</option>
                                {subjects2.map((subject:any)=>{
                                    return (
                                        <option value={subject.id} key={subject.id}>{subject.title}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <span className="mb-1.5">Title</span>
                            <input type="text" placeholder="Hint" className="input input-md input-accent" required />
                            <br />
                            <span className="mb-2">Content</span>
                            <textarea className="textarea textarea-accent" name="content" rows={10} placeholder="Type or paste your code here..."></textarea>
                            <br />
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" type="submit">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}