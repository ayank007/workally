"use client";

import { useState } from "react";
import Login from "./login";
import Signup from "./signup";

const Profile = () => {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: "",
        password: "",
        isVerified: false,
        isPrime: false,
        isAdmin: false
    });
    const [notLoggedPage, setNotLoggedPage] = useState(1);

    if (user.id == "") {
        if (notLoggedPage == 0) {
            return <Login handleNotLoggedPage={()=>setNotLoggedPage(1)} />;
        } else {
            return <Signup handleNotLoggedPage={()=>setNotLoggedPage(0)} />;
        }
    }
    return (
        <>
            <h1>Profile</h1>
            <div className="divider w-full">
                <h1>Welcome {user.name}</h1>
            </div>
        </>
    );
}

export default Profile;