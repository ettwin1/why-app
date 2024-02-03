"use client";

import SignInButton from "./SignInButton";

const NavBar = () => {
    return (
        <div className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
            <div className="ml-auto"><SignInButton /></div>
        </div>
    );
   
}

export default NavBar
