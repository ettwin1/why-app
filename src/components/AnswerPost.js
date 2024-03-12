
import Link from 'next/link';

const AnswerPost = ({ answerData }) => {

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-lg mx-auto mt-4" >
            <div className="mb-4">
                <p className="font-bold">{answerData.answerer}</p>
                <p className="text-gray-500 text-sm ">{new Date(answerData.created).getFullYear()}</p>
            </div>
            <div >{answerData.answer}</div>
        </div>
    );
}

export default AnswerPost;