"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { useState, useRef } from "react";
import { addChannel } from "../actions/Actions";

export default async function dashboard() {
    const channelInpRef = useRef<HTMLInputElement>(null);
    const channelAddBtnRef = useRef<HTMLButtonElement>(null);
    const [name, setName] = useState("");
    
    const addChannelHandler = () => {
        const channelAddBtn = channelAddBtnRef.current!;
        const channelInp = channelInpRef.current!;
        channelAddBtn.classList.add("pointer-event-none");
        channelAddBtn.innerHTML = "Loading";
        try {
            addChannel(name);
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

    return (
        <>
            <h1>Dashboard</h1>
            <hr />
            <div className="cards">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Add a new Channel</CardTitle>
                        <CardDescription>
                            A Channel only takes a title. By default it holds no subjects.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Label htmlFor="title">Channel Name</Label>
                        <Input id="title" type="text" ref={channelInpRef} required placeholder="DSA" onChange={(e) => setName(e.target.value)}  />
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="button" ref={channelAddBtnRef} className="w-full" onClick={addChannelHandler}>
                        Add
                        </Button>
                        <CardAction><a href="/" className="body-link">View Channels</a></CardAction>
                    </CardFooter>
                </Card>

                <Alert>
                    <i className="fa-solid fa-circle-check" />
                    <AlertTitle>Success! Your changes have been saved</AlertTitle>
                    <AlertDescription>
                    This is an alert with icon, title and description.
                    </AlertDescription>
                </Alert>
            </div>
        </>
    );
}