"use client";
import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import Image from 'next/image';

const SignInButton = ({ className }) => {

    const { data: session } = useSession();

    async function signingIn() {
        signIn('google', {
            callbackUrl: '/signingIn', // Redirect URL after successful sign-in
        });

        
    }

    if (session && session.user) {
        return (
            <div className={className}>
                <span className="m-2">{session.user.name}</span>
                
                
                <Image
                    className="inline rounded-full"
                    src={session.user.image}
                    alt={session.user.name + " Photo"}
                    width={48} // Set the width of the image
                    height={48} // Set the height of the image
                />
                <button className="m-2" onClick={() => signOut()}>Sign out</button>
            </div>
        );
    }

    return (
        <button onClick={() => signingIn()}>Sign In</button>
    );
}

export default SignInButton


//if (status === 'loading') return <h1> loading... please wait</h1>;
//if (status === 'authenticated') {