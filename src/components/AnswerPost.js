
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

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-lg mx-auto mt-4" >
            <div className="mb-4">
                <img className="rounded-full" width={48} height={48} src={answerData.img} />
                <p className="font-bold">{answerData.name}</p>
                <p className="text-gray-500 text-sm ">{new Date(answerData.created).getFullYear()}</p>
            </div>
            <div >{answerData.answer}</div>
            {!liked ? (
                <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like.png" />
            ) : (
                <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like_filled.png" />
            )}
            <span>{likes}</span>
        </div>
    );
}

export default AnswerPost;