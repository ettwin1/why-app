
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const AnswerPost = ({ answerData, userEmail }) => {
    //console.log(answerData.id, answerData.liked);
    const [liked, setLike] = useState(answerData.liked);
    const [likes, changeLikes] = useState(answerData.likes);

    async function addLike() {
        const likeData = JSON.stringify({
            email: userEmail,
            answerId: answerData.id,
        });
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: likeData,
        }

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=addAnswerLike';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log("Add Answer like: ", result);

    }

    async function removeLike() {
        const likeData = JSON.stringify({
            email: userEmail,
            answerId: answerData.id,
        });
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: likeData,
        }

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=removeAnswerLike';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log("Remove Answer like: ", result);

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

    function returnDate(date) {
        const text = date.toDateString()
        return text;
    }

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-lg mx-auto mt-8" >
            <div className="flex justify-between">
                <div>
                    <img className="rounded-full inline" width={40} height={40} src={answerData.img} />
                    <p className="inline ml-3 text-gray-600">{answerData.name}</p>
                </div>
                <p className="text-gray-500 text-sm mt-2">{returnDate(new Date(answerData.created))}</p>
            </div>
            <div className="p-2">{answerData.answer}</div>
            {!liked ? (
                <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like.png" />
            ) : (
                <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like_filled.png" />
            )}
            <span className="ml-2">{likes}</span>
        </div>
    );
}

export default AnswerPost;