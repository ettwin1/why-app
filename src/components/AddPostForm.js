import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const AddPostForm = ({ onSubmit }) => {
    const { data: session } = useSession();

    const handleSubmit = (form) => {
        form.preventDefault();
        
        if (session && session.user) {
            const question = form.target.question.value;
            if (question.slice(0, 3).toUpperCase() == "WHY") {
                const email = session.user.email;
                const data = JSON.stringify({
                    "question": question,
                    "email": email
                })
                onSubmit(data);
            }else {
                alert("Question must begin with 'Why'");
            }
            
        } else {
            // Go to login screen
            signIn('google', {
                callbackUrl: '/signingIn', // Redirect URL after successful sign-in
            });
        } 
        
    }

    return (
         <div className="bg-white p-4 shadow-md rounded-md mt-8" >
            <div className="text-xxl mb-2">Add Question</div>
            <form onSubmit={handleSubmit}>
                <input
                    className="w-10/12 h-8 bg-gray-100 p-4"
                    type="text"
                    name="question"
                    maxLength="255"
                    placeholder="Why..."
                />

                <button className="bg-gray-200 rounded p-1 px-2" type="submit">Add Post</button>

            </form>         
        </div>

       
    );
}

export default AddPostForm;