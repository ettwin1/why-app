import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import AnswerPost from '../components/AnswerPost';


const AnswersPage = ({ receivedData }) => {
    const router = useRouter();
    const postId = router.query.id || receivedData;

    async function searchPosts(searchTerm) {
        const requestData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=search&term=' + searchTerm;
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log(result)
        setData(result.results);
    }

    async function getAnswers() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=answers&id='+postId;
        const response = await fetch(apiUrlEndpoint, postData);
        const result = await response.json();
        console.log(result)
        setAnswers(result.results.answers);
        setQuestion(result.results.question[0].question)

    };

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState([]);

    // OnLoad
    useEffect(() => {

        getAnswers();
    }, []);


    return (
        <>
            
            <NavBar onSubmit={searchPosts} />
            <main className="flex min-h-screen flex-col items-center p-2">

                <div>
                    <h1>{question}</h1>
                    {answers.map((item) => (
                        <AnswerPost key={item.id} answerData={item} />
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