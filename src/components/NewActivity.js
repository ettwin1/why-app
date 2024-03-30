import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const NewActivity = ({ newActivityData, userEmail }) => {
    const router = useRouter();

    async function onLinkClick(post_id) {
        // Delete activity from database
        const dataForDelete = JSON.stringify({
            email: userEmail,
            postId: post_id,
        });
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: dataForDelete,
        }

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=deleteActivity';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log(result);

        // Go to answers page
        router.push(`/answers?id=${encodeURIComponent(post_id)}`)
    }

    return (
        <div className="bg-white p-4 shadow-md rounded-md mt-8 w-64" >
            <p className="text-xxl">My Posts</p>
            <p className="text-sm text-gray-600 mb-2">New Activity</p>
            {(newActivityData.toString() === "") ? (
                (!userEmail) ? (
                    <a className="text-sky-600" onClick={()=>signIn('google', {callbackUrl: '/signingIn', }) }>See posts</a>
                ) : (
                    <p>No new activity</p>
                )
            ) : (
                newActivityData.map((post) => (
                    <div key={post.id} className="text-left text-sky-600 p-1"><a onClick={() => onLinkClick(post.id)}>({post.amount}) {post.question}</a></div>
                ))
            )}
        </div>
    );
}

export default NewActivity;