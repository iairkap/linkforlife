import React from "react";
import { useState } from "react";
import Modal from "./modal";
import "../sass/layout/modalContent.scss"
import Button from './button';
import InputField from "./InputField";
import axios from "axios";

interface CheckTokenProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    weddingId: string | undefined;
    setIsOpen: (value: boolean) => void;
    token: string;
    setToken: (value: string) => void;
    handleCheckToken: () => void;
    invalidToken: boolean;
    setInvalidToken?: (value: boolean) => void;

}

function CheckToken({ isOpen, contentLabel, onRequestClose, weddingId, setIsOpen, token, setToken, handleCheckToken, invalidToken }: CheckTokenProps) {

    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose}>
            <div className='modalContent'>
                <h1>Check Token</h1>
                <InputField type='text' value={token} onChange={(e) => setToken(e.target.value)} placeholder="Write token provided by the groom/bride" />
                <button onClick={handleCheckToken}>Check Token</button>
                {invalidToken && <p>Invalid Token</p>}
            </div>
        </Modal>
    )
}

export default CheckToken;