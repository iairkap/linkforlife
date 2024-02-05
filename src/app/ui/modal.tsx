import React from 'react';
import ReactModal from 'react-modal';
import "../sass/components/modal.scss"
interface ModalProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    children: React.ReactNode;
}

function Modal({ isOpen, contentLabel, onRequestClose, children }: ModalProps) {
    console.log('Modal isOpen:', isOpen);

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            className="myModal"
            overlayClassName="myOverlay"
        >
            {children}

        </ReactModal>
    );
}

export default Modal;