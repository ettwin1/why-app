import { useState, useEffect } from 'react';
import AddAnswerForm from './AddAnswerForm';
import { signIn } from 'next-auth/react';
const QuestionBanner = ({ questionData, onAddAnswer, userEmail }) => {

    const [liked, setLike] = useState(questionData.liked);
    const [likes, changeLikes] = useState(questionData.likes);

    async function addLike() {
        const likeData = JSON.stringify({
            email: userEmail,
            postId: questionData.id,
        });
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: likeData,
        }

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=addLike';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log("Add like: ", result);

    }

    async function removeLike() {
        const likeData = JSON.stringify({
            email: userEmail,
            postId: questionData.id,
        });
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: likeData,
        }

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=removeLike';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log("Remove like: ", result);

    }

    function like() {
        if (userEmail) {
            if (!liked) {
                setLike(true);
                addLike();
                changeLikes(likes + 1);
            }
            else {
                setLike(false);
                removeLike();
                changeLikes(likes - 1);
            }
        } else {
            signIn('google', {
                callbackUrl: '/signingIn', // Redirect URL after successful sign-in
            });
        }
    }

    function addAnswer(answerData) {
        onAddAnswer(answerData);
    }

    useEffect(() => {
        // Update the state variables when questionData changes
        changeLikes(questionData.likes);
        setLike(questionData.liked);
    }, [questionData]);

    return (
        <div className="p-8 px-16">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img className="rounded-full" src={questionData.img} width={40} height={40} alt="Profile pic" />
                    <p className=" ml-3 text-gray-600">{questionData.name}</p>
                </div>
                <h1 className="p-2 mt-4">{questionData.question}</h1>
                <p className="text-gray-500 text-sm">{new Date(questionData.created).toDateString()}</p>
            </div>
            
            <div className="flex items-center mb-2">
                {!liked ? (
                    <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like.png" />
                ) : (
                    <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like_filled.png" />
                )}
                <span className="ml-2">{likes}</span>
            </div>
            <AddAnswerForm onSubmit={addAnswer} postId={questionData.id} />
        </div>
    );
}

export default QuestionBanner