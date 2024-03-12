import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import QuestionPost from "../components/QuestionPost"
import AddPostForm from "../components/AddPostForm";

const inter = Inter({ subsets: ["latin"] });

function Button({ onClick }) {
    return (
        <button onClick={onClick}>
            Create Post
        </button>
    );
}


export default function Home() {

   
    const [created, setCreated] = useState(false);
    const [like, setLike] = useState(false);
    


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
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=all';
        const response = await fetch(apiUrlEndpoint, postData);
        const result = await response.json();
        console.log(result)
        setData(result.results);    

    };

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




    // OnLoad
    useEffect(() => {
        
        getPosts();
    }, []);

    

    

    function click() {
        if (!like) setLike(true);
        else setLike(false);
    }



    return (
        <>
            <NavBar onSubmit={searchPosts} />
            <main className="flex min-h-screen flex-col items-center p-2">
                
                <div>
                    <AddPostForm onSubmit={addPost} />

                    {data.map((item) => (
                        <QuestionPost key={item.id} postData={item} onSubmit={ addAnswer } />
                    ))}

                    {!like ? (
                        <img className="m-4" onClick={click} src="images/like.png" />
                    ) : (
                        <img className="m-4" onClick={click} src="images/like_filled.png" />
                    ) }
                    
                </div>

            </main>
        </>
    );
}
