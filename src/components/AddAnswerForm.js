import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const AddAnswerForm = ({ onSubmit, postId, userEmail }) => {
    const { data: session } = useSession();

    const handleSubmit = (form) => {
        form.preventDefault();

        if (session && session.user) {
            const answer = form.target.answer.value;
            const email = session.user.email;
            const data = JSON.stringify({
                "answer": answer,
                "email": email,
                "postId": postId,
            })
            onSubmit(data);
            form.target.answer.value = "";
            form.target.answer.placeholder = "Answer Submitted";
        } else {
            signIn('google', {
                callbackUrl: '/signingIn', // Redirect URL after successful sign-in
            });
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="w-11/12 h-8 bg-gray-100 p-4"
                type="text"
                name="answer"
                maxLength="2048"
                placeholder="Because..."
            />
           
            <button className="w-1/12 bg-gray-200 rounded p-1 px-2" type="submit">Add</button>
  
        </form>
    );
}

export default AddAnswerForm;