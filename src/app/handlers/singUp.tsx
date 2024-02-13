import axios from 'axios';

//postear el objeto del form a la api para el sign up 



export async function signUp(data: any) {
    try {
        const response = await axios.post('/api/signin', data);
        console.log(response.data);
        return { message: response.data.message, status: 200 };
    } catch (error: any) {
        console.log(error.response.data);
        return { message: error.response.data.error, status: 500 };
    }
}

export async function signUpWithGoogle(data: any) {
    console.log('signUpWithGoogle called with data:', data);
    try {
        const response = await axios.post('/api/signingoogle', data);
        console.log('Response from /api/signin/google:', response.data);
        return { message: response.data.message, status: 200 };
    } catch (error: any) {
        console.log('Error from /api/signin/google:', error.response.data);
        return { message: error.response.data.error, status: 500 };
    }
}