import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import QuestionPost from "../components/QuestionPost"
import AddPostForm from "../components/AddPostForm";
import NewActivity from "../components/NewActivity";
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });


export default function Home({ searchQuery }) {

    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    const [created, setCreated] = useState(false);
    
    const [newActivityData, setNewActivityData] = useState([]);
    
    const { data: session, status } = useSession();
    let email;
    if (session && session.user) {
        email = session.user.email;
        
    }
    
    const router = useRouter();
    const searchTerm = router.query.search || searchQuery || "";
    

    async function searchPosts(searchTerm) {
        //Insert more string manipulation to parse keywords out of the search term
        const requestData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=search&term=' + searchTerm + '&email=' + email;
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log("Search results: ", result);
        setData(result.results);
    }

    async function getPosts() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        //console.log("email: ", email);
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=all&email='+email;

        const response = await fetch(apiUrlEndpoint, postData);
        const result = await response.json();
        console.log(result)
        setData(result.results);
    };

    async function getNewActivity() {
        const requestData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=activity&user=' + encodeURIComponent(email);
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log(result.results)
        setNewActivityData(result.results); 
    }

    const [data, setData] = useState([]);
    
    async function addPost(postData) {
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: postData,
        }

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=createPost';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log(result);
        setCreated(true);
        const newData = result.record;

        setData([
            {
                id: newData.id,
                question: newData.question,
                asker: newData.asker,
                created: newData.created,
                img: newData.img,
                name: newData.name,
                answers: 0,
                liked: 0,
                likes: 0,
            },
            ...data,
        ]);
        console.log("updated data: ", data);
    };

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
        console.log("Answer submitted: ",result);
        //const newAnswerData = result.record;
    };


    useEffect(() => {
        if (status === 'authenticated') {
            getNewActivity();
            if (searchTerm == "") {
                getPosts();
            } else {
                searchPosts(searchTerm);
            }
        } else if (status === 'unauthenticated') {
            if (searchTerm == "") {
                getPosts();
            } else {
                searchPosts(searchTerm);
            }
        }
    }, [status, searchTerm])
    

    



    return (
        <>
            <NavBar searchTerm={searchTerm} />
            <div className="mt-20 flex justify-center">
                <div className="mr-8 w-640">
                    <AddPostForm onSubmit={addPost} />
                    {data.map((item) => (
                        <QuestionPost key={item.id} postData={item} userEmail={email} onSubmit={addAnswer} />
                    ))}
                </div>
                <div className="">
                    <NewActivity newActivityData={newActivityData} userEmail={ email } />
                </div>
            </div>
            
        </>
    );
}

//Get Query Parameters (when page is loaded directly from the server)
export async function getServerSideProps({ query }) {

    const receivedData = query.data || "";

    return {
        props: {
            receivedData,
        },
    };
}