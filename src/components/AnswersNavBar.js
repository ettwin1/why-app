"use client";
import QuestionBanner from "./QuestionBanner";
import SearchBar from "./SearchBar"
import SignInButton from "./SignInButton";

const AnswersNavBar = ({ onAddAnswer, questionData, userEmail }) => {
    return (
        <div className="p-4 bg-white shadow">
            <div className="flex justify-between ">
                <a href="/"><img src="./images/logo.png" /></a>
                <div className="ml-auto"><SignInButton /></div>   
            </div>
            <SearchBar className="text-center " searchTerm="" />
            <QuestionBanner onAddAnswer={onAddAnswer} questionData={questionData} userEmail={userEmail} />
        </div>
    );
   
}

export default AnswersNavBar
