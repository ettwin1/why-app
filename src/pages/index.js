import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";

import IndexPage from "./IndexPage";
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

    //var stuff = [];
    //const [content, setContent] = useState([]);

    async function getData() {
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler';
        const response = await fetch(apiUrlEndpoint, postData);
        const result = await response.json();
        console.log(result)
        setData(result.results);
        
        //data.map((item) => (
        //    stuff.push(React.createElement("p", null, item.postTime))
        //));
        //const element = React.createElement("div", null, stuff);
        //setContent(element);
        //console.log(stuff);
        //console.log(content);
        

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

        const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler';
        const response = await fetch(apiUrlEndpoint, requestData);
        const result = await response.json();
        console.log(result);
        setCreated(true);
        const newData = result.record;

        //const element2 = <div>React.createElement("p", null, result.record.postTime)</div>;
        //stuff.push(element2);
        //const elements = React.createElement("div", null, stuff);
        //setContent(elements);


        setData([
            {
                id: newData.id,
                question: newData.question,
                asker: newData.asker,
                created: newData.created,
            },
            ...data,
        ]);
    };




    // OnLoad
    useEffect(() => {
        
        getData();
    }, []);

    

    

    function click() {
        if (!like) setLike(true);
        else setLike(false);
    }



    return (
        <>
            <NavBar />
            <main className="flex min-h-screen flex-col items-center p-2">
                
                <div>
                    <AddPostForm onSubmit={addPost} />
                    {/*<div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addPost(JSON.stringify({ "name": "test", "question": "test" }))} ><Button className="" /></div>*/}
                    {/* {content}*/}

                        {data.map((item) => (
                            <div className="bg-white p-4 shadow-md rounded-md max-w-lg mx-auto mt-4" key={item.id}>
                              <div className="mb-4">
                                    <p className="font-bold">{item.asker}</p>
                                    <p className="text-gray-500 text-sm ">{new Date(item.created).getFullYear()}</p>
                              </div>
                              <div >{item.question}</div>
                            </div>
                        ))}
                    {/*<p>{created}</p>*/}
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
