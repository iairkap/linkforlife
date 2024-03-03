import axios from 'axios';

//postear el objeto del form a la api para el sign up 



export async function signUp(data: any) {
    try {
        const response = await axios.post('/api/signin', data);

        return { message: response.data.message, status: 200 };
    } catch (error: any) {

        return { message: error.response.data.error, status: 500 };
    }
}

export async function signUpWithGoogle(data: any) {

    try {
        const response = await axios.post('/api/signingoogle', data);

        return { message: response.data.message, status: 200 };
    } catch (error: any) {

        return { message: error.response.data.error, status: 500 };
    }
}