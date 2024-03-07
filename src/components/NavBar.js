"use client";
import SearchBar from "./SearchBar"
import SignInButton from "./SignInButton";

const NavBar = ({onSubmit}) => {
    return (
        <div className="p-4 bg-white shadow">
            <div className="flex gap-4 ">
                <h1 className="text-xl font-medium">Why App</h1>
                <div className="ml-auto"><SignInButton /></div>   
            </div>
            <SearchBar className="text-center" onSubmit={onSubmit} />
        </div>
    );
   
}

export default NavBar
