"use client";

import { addUser } from "@/actions/Actions";
import { FormEvent, useState } from "react";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";



const Signup = ({handleNotLoggedPage}: {handleNotLoggedPage: () => void}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const signupHandler = (e: FormEvent) => {
        e.preventDefault();
        const name = (e.target as HTMLFormElement).elements.namedItem("name") as HTMLInputElement;
        const email = (e.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
        const password = (e.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
        handleNotLoggedPage();

        console.log(name, email, password);
        
        try {
            async function signup() {
                const res = await addUser(name.value, email.value, password.value);
                if (res.code == 200) {
                    // signup done
                    alert(res.message);
                    handleNotLoggedPage();
                    // redirect('/login', RedirectType.replace)
                } else {
                    alert(res.message);
                    // reset the form
                    (e.target as HTMLFormElement).reset();
                }
            }
            signup();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1>Signup</h1>
            <div className="divider w-full"></div>
            
            <div className="card bg-base-100 mx-auto w-96 shadow-sm text-center text-base-content">
                <form onSubmit={signupHandler}>
                    <div className="card-body">
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="text"
                                required
                                placeholder="Your Name"
                                pattern="[A-Za-z]*"
                                minLength={3}
                                maxLength={20}
                                title="Name"
                                name="name"
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be 3 to 30 characters
                            <br />containing only letters
                        </p>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" placeholder="mail@site.com" required name="email" />
                        </label>
                        <div className="validator-hint hidden">Enter valid email address</div>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                minLength={8}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                name="password"
                            />
                            <div className="passwordEye absolute top-1/2 right-2 translate-y-[-50%] cursor-pointer" onClick={togglePasswordVisibility}>
                                <span className=""><IoMdEye /></span>
                                <span className="hidden"><IoMdEyeOff /></span>
                            </div>
                        </label>
                        <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </div>
                    <div className="card-actions flex-col items-center">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                        <a href="#" onClick={handleNotLoggedPage} className="body-link link link-secondary">Already have an account? Login!</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup;