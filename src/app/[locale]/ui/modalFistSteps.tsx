import React from 'react';
import ReactModal from 'react-modal';
import "../sass/components/modalBis.scss"

interface ModalProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    children: React.ReactNode;
}


function ModalFistStepsB({ isOpen, contentLabel, onRequestClose, children }: ModalProps) {
    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            className="myModalB"
            overlayClassName="myOverlayB"
        >
            {children}
        </ReactModal>
    );
}

export default ModalFistStepsB;