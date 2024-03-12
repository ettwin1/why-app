import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

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
        } 
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className=""
                type="text"
                name="question"
                maxLength="255"
                placeholder="Type Question Here"
            />

            <button type="submit">Add Post</button>
            
        </form>
    );
}

export default AddPostForm;