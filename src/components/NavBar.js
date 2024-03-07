"use client";

import SignInButton from "./SignInButton";

const NavBar = () => {
    return (
        <div className="flex gap-4 p-4 bg-white shadow">
            <h1 className="text-xl font-medium">Why App</h1>
            <div className="ml-auto"><SignInButton /></div>
        </div>
    );
   
}

export default NavBar
