import AddAnswerForm from "./AddAnswerForm";
import Link from 'next/link';

const QuestionPost = ({postData, onSubmit}) => {

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-lg mx-auto mt-4" >
            <div className="mb-4">
                <img className="w-12, h-12" src={postData.img} />
                <p className="font-bold">{postData.name}</p>
                <p className="text-gray-500 text-sm ">{new Date(postData.created).getFullYear()}</p>
            </div>
            <div >{postData.question}</div>
            <div className="text-right "><Link href={`/answers?id=${encodeURIComponent(postData.id)}`}>See answers here</Link></div>
            
            <hr />
            <AddAnswerForm onSubmit={onSubmit} postId={postData.id} />
        </div>
    );
}

export default QuestionPost;