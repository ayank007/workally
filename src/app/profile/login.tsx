"use client";

import { loginUser } from "@/actions/Actions";
import { FormEvent } from "react";

const Login = ({handleNotLoggedPage}:{handleNotLoggedPage: () => void }) => {

    const loginHandler = (e: FormEvent) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
        const password = (e.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
        
        try {
            async function login() {
                const res = await loginUser(email.value, password.value);
                if (res.code == 200) {
                    // login done
                }
            }
        } catch (error) {
            alert("Failed Login Attempt");
            console.log(error);
        } finally {
            (e.target as HTMLFormElement).reset();
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <div className="divider w-full"></div>
            
            <div className="card bg-base-100 w-96 mx-auto shadow-sm text-center text-base-content">
                <div className="card-body">
                    <form onSubmit={loginHandler}>
                        
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
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                minLength={8}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            />
                        </label>
                        <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                        
                        <div className="card-actions flex-col items-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <a href="#" onClick={handleNotLoggedPage} className="body-link link link-secondary">Don't have an account? Sign Up!</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;