import AddAnswerForm from "./AddAnswerForm";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

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

        if (!liked) {
            setLike(true);
            addLike();
            changeLikes(likes+1);
        }
        else {
            setLike(false);
            removeLike();
            changeLikes(likes - 1);
        }
    }

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-lg mt-4" >
            <div className="mb-4">
                <img className="rounded-full" src={postData.img} width={48} height={48} alt="Profile pic" />
                <p className="font-bold">{postData.name}</p>
                <p className="text-gray-500 text-sm ">{new Date(postData.created).getFullYear()}</p>
            </div>
            <div >{postData.question}</div>
            <div className="flex justify-between">
                <div>
                    {!liked ? (
                        <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like.png" />
                    ) : (
                        <img className="inline" onClick={like} alt="" width={16} height={16} src="images/like_filled.png" />
                    )}
                    <span>{likes}</span>
                </div>    
                <div className="text-right "><Link href={`/answers?id=${encodeURIComponent(postData.id)}`}>See answers here</Link></div>
            </div>
            <hr />
            <AddAnswerForm onSubmit={onSubmit} postId={postData.id} />
        </div>
    );
}

export default QuestionPost;