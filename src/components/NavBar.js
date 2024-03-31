"use client";
import SearchBar from "./SearchBar"
import SignInButton from "./SignInButton";

const NavBar = ({ searchTerm }) => {
    return (
        <div className="p-2 bg-white shadow top-0 fixed w-full">
            <div className="flex justify-between items-center ">

                <div><a href="/"><img src="./images/logo.png" /></a></div>
                <SearchBar className="text-center" searchTerm={searchTerm} />
                <div className=""><SignInButton /></div>   
            </div>
            
        </div>
    );
   
}

export default NavBar
