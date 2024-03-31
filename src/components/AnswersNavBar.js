"use client";
import NavBar from "./NavBar";
import QuestionBanner from "./QuestionBanner";
import SearchBar from "./SearchBar"
import SignInButton from "./SignInButton";

const AnswersNavBar = ({ onAddAnswer, questionData, userEmail }) => {
    return (
        <>
            <NavBar />
            <div className="p-2 bg-white shadow mt-12">
                <QuestionBanner onAddAnswer={onAddAnswer} questionData={questionData} userEmail={userEmail} />
            </div>
        </>
    );
   
}

export default AnswersNavBar
