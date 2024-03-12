import { useRouter } from 'next/router';
import { useSession} from 'next-auth/react';

const SigningIn = () => {
    const { data: session } = useSession();
    const router = useRouter();
    async function addRecordIfNotExist() {
        //If this is a first time login, save profile information
        if (session && session.user) {
            const email = session.user.email;
            const name = session.user.name;
            const img = session.user.image;
            const userData = JSON.stringify({
                "email": email,
                "name": name,
                "img": img,
            });

            const requestData = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: userData,
            }

            const apiUrlEndpoint = 'http://localhost:3000/api/dbhandler?requestType=userExists';
            const response = await fetch(apiUrlEndpoint, requestData);
            const result = await response.json();
            console.log(result);
            redirectToHomePage();
        } else {
        }
    }

    function redirectToHomePage() {
        router.push('/');
    }

    addRecordIfNotExist();
    return (<p>Signing In...</p>);
}

export default SigningIn;