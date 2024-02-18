// tokenHandler.tsx
import axios from 'axios';
import { useState } from 'react';

export const useTokenHandler = (token: string, weddingId: string | undefined, setIsOpen: (value: boolean) => void) => {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [invalidToken, setInvalidToken] = useState(false);

    const handleCheckToken = async () => {
        try {
            const response = await axios.post('/api/checkToken', { token, weddingId });
            if (response.status === 200) {
                setIsTokenValid(true);
                setIsOpen(false);
            } else if (response.status === 400) {
                setIsTokenValid(false);
                setInvalidToken(true);
            }
        } catch (error) {
            console.error(error);
            setInvalidToken(true);
        }
    }

    return { isTokenValid, invalidToken, handleCheckToken };
}