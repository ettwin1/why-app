import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import QuestionPost from "../components/QuestionPost"
import AddPostForm from "../components/AddPostForm";
import NewActivity from "../components/NewActivity";
import { useSession, signOut, signIn } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

function Button({ onClick }) {
    return (
        <button onClick={onClick}>
            Create Post
        </button>
    );
}


export default function Home() {

    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    const [created, setCreated] = useState(false);
    
    const [newActivityData, setNewActivityData] = useState([]);
    
    const { data: session, status } = useSession();
    let email;
    if (session && session.user) {
        email = session.user.email;
        
    }
    

    

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

    async function getPosts() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
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
            },
            ...data,
        ]);
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
        console.log(result);
        const newData = result.record;
    };





    useEffect(() => {
        if (status === 'authenticated') {
            getNewActivity();
            getPosts();
        }
    }, [status])
    

    



    return (
        <>
            <NavBar onSubmit={searchPosts} />
            <main className="flex justify-center">
                <div className="p-4">
                    <AddPostForm onSubmit={addPost} />
                    {data.map((item) => (
                        <QuestionPost key={item.id} postData={item} userEmail={email} onSubmit={addAnswer} />
                    ))}
                </div>
                <div>
                    <NewActivity newActivityData={newActivityData} userEmail={ email } />
                </div>
            </main>

            
        </>
    );
}
