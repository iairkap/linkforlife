"use client"
import React, { useState } from 'react';
import CheckToken from '../../ui/token';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useTokenHandler } from '@/app/handlers/tokenHandler';
import AddInvByToken from '../../ui/addInvByToken';


function InvitationList() {
    const pathName = usePathname();
    const weddingId = pathName?.split('/')[3]
    const [isOpen, setIsOpen] = useState(true);
    const [token, setToken] = useState('');

    const { isTokenValid, invalidToken, handleCheckToken } = useTokenHandler(token, weddingId, setIsOpen);



    return (
        <main>
            <section>
                <div>
                    <CheckToken isOpen={isOpen} contentLabel="Check Token" onRequestClose={() => setIsOpen(false)} weddingId={weddingId} setIsOpen={setIsOpen} token={token} setToken={setToken} handleCheckToken={handleCheckToken} invalidToken={invalidToken} />
                </div>
                {
                    isTokenValid && <AddInvByToken weddingId={weddingId} />
                }
            </section>
        </main>
    );
}

export default InvitationList;