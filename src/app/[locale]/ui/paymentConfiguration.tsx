import React, { useState } from 'react'
import Modal from './modal';
import type { ModalType } from "../../../types/types"


function paymentConfiguration({ isOpen, onRequestClose, contentLabel }: ModalType) {

    const [split, setSplit] = useState([]);





    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"Paid"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>
                    Wedding Payment Configuration
                </h1>

                <article className="layout">
                    <h2>How are you going to split the bills?</h2>
                    <select name="" id=""></select>
                </article>

            </section>
        </Modal>
    );
}

export default paymentConfiguration;