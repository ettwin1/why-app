"use client";
import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';

const SignInButton = ({ className }) => {

    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className={className}>
                <span className="m-2">{session.user.email}</span>
                <span className="m-2">{session.user.name}</span>
                <image className="inline" src={session.user.image} alt={session.user.name + " Photo"} /> { /* Not sure why session.user.image isn't working... perhaps needs permissions to get image*/}
                <button className="m-2" onClick={() => signOut() }>Sign out</button>
            </div>
        );
    }

    return (
        <button onClick={() => signIn()}>Sign In</button>
    );
}

export default SignInButton


//if (status === 'loading') return <h1> loading... please wait</h1>;
//if (status === 'authenticated') {