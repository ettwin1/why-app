import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import AnswerPost from '../components/AnswerPost';
import { useSession } from 'next-auth/react';
import AnswersNavBar from '../components/AnswersNavBar';


const AnswersPage = ({ receivedData }) => {
    const router = useRouter();
    const postId = router.query.id || receivedData;

    const { data: session, status } = useSession();
    let email;
    if (session && session.user) {
        email = session.user.email;

    }

    async function addAnswer(answerData) {
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: answerData,
        }

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=createAnswer';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log("Answer submitted: ", result);
        const newData = result.record;

        setAnswers([
            {
                id: newData.id,
                answer: newData.answer,
                answerer: newData.answerer,
                created: newData.created,
                img: newData.img,
                name: newData.name,
                postId: newData.postId,
                liked: 0,
                likes: 0,
            },
            ...answers,
        ]);
        //const newAnswerData = result.record;
    };

    async function getAnswers() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=answers&id=' + postId + '&email=' + encodeURIComponent(email);
        const response = await fetch(apiUrlEndpoint, postData);
        const result = await response.json();
        console.log("Answers Request: ", result)
        setAnswers(result.results.answers);
        setQuestionData(result.results.questionData[0])

    };

    const [answers, setAnswers] = useState([]);
    const [questionData, setQuestionData] = useState([]);


    useEffect(() => {
        if (status === 'authenticated' || status === 'unauthenticated') {
            getAnswers();
        }
    }, [status])


    return (
        <>

            <AnswersNavBar questionData={questionData} onAddAnswer={addAnswer} userEmail={email} />
            <main className="flex min-h-screen flex-col items-center p-2">
                <div>
                    {answers.map((item) => (
                        <AnswerPost key={item.id} answerData={item} userEmail={email} />
                    ))}      
                </div>

            </main>
        </>
    );
};

//Get Query Parameters (when page is loaded directly from the server)
export async function getServerSideProps({ query }) {

    const receivedData = query.data || 'Default Value';

    return {
        props: {
            receivedData,
        },
    };
}

export default AnswersPage;