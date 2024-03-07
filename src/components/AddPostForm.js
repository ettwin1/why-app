import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const AddPostForm = ({ onSubmit }) => {
    const { data: session } = useSession();

    const handleSubmit = (form) => {
        form.preventDefault();
        
        if (session && session.user) {
            const question = form.target.question.value;
            const name = session.user.name;
            const data = JSON.stringify({
                "question": question,
                "name": name
            })
            onSubmit(data);
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