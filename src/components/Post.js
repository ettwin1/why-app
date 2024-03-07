import AddAnswerForm from "./AddAnswerForm";

const Post = ({postData, onSubmit}) => {

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-lg mx-auto mt-4" >
            <div className="mb-4">
                <p className="font-bold">{postData.asker}</p>
                <p className="text-gray-500 text-sm ">{new Date(postData.created).getFullYear()}</p>
            </div>
            <div >{postData.question}</div>
            <br />
            <hr />
            <AddAnswerForm onSubmit={onSubmit} postId={postData.id} />
        </div>
    );
}

export default Post;