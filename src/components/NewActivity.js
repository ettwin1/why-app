import { useRouter } from 'next/router';

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
        <div className="bg-white p-4 shadow-md rounded-md max-w-lg mt-4" >
            <p>New Activity</p>
            {(newActivityData.toString() === "") ? (<p>No new activity</p>) : (
                newActivityData.map((post) => (
                <div key={post.id} className="text-left "><a onClick={() => onLinkClick(post.id)}>{post.question}</a></div>
                ))
            )}
            

        </div>
    );
}

export default NewActivity;