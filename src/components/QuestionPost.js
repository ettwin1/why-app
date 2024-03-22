import AddAnswerForm from "./AddAnswerForm";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const QuestionPost = ({ postData, onSubmit, userEmail }) => {
    
    const [liked, setLike] = useState(postData.liked);
    const [likes, changeLikes] = useState(postData.likes);

    async function addLike() {
        const likeData = JSON.stringify({
            email: userEmail,
            postId: postData.id,
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
        console.log("Add like: ",result);

    }

    async function removeLike() {
        const likeData = JSON.stringify({
            email: userEmail,
            postId: postData.id,
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

    return (
        <div className="bg-white p-4 shadow-md rounded-md mt-8" >
            <div className="">
                <img className="rounded-full inline" src={postData.img} width={40} height={40} alt="Profile pic" />
                <p className="inline ml-3 text-gray-600">{postData.name}</p>
               {/* <p className="text-gray-500 text-sm ">{new Date(postData.created).getFullYear()}</p>*/}
            </div>
            <div className="text-xxl p-2">{postData.question}</div>
            <div className="flex justify-between mb-2">
                <div>
                    {!liked ? (
                        <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like.png" />
                    ) : (
                        <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like_filled.png" />
                    )}
                    <span className="ml-2">{likes}</span>
                </div>    
                <div className="text-right text-sky-600"><Link href={`/answers?id=${encodeURIComponent(postData.id)}`}>See answers here</Link></div>
            </div>
            <AddAnswerForm onSubmit={onSubmit} postId={postData.id} />
        </div>
    );
}

export default QuestionPost;