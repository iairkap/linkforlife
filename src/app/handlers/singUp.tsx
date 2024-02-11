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