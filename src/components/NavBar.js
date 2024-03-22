"use client";
import SearchBar from "./SearchBar"
import SignInButton from "./SignInButton";

const NavBar = ({onSubmit}) => {
    return (
        <div className="p-4 bg-white shadow">
            <div className="flex justify-between ">
                <a href="/"><img src="./images/logo.png" /></a>
                <div className="ml-auto"><SignInButton /></div>   
            </div>
            <SearchBar className="text-center" onSubmit={onSubmit} />
        </div>
    );
   
}

export default NavBar
