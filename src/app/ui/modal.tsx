import React from 'react';
import ReactModal from 'react-modal';
import "../sass/components/modal.scss"



interface ModalProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    children: React.ReactNode;
    icon?: any
}

function Modal({ isOpen, contentLabel, onRequestClose, children, icon }: ModalProps) {

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            className="myModal"
            overlayClassName="myOverlay"
        >
            <div className='icon-container'>
                <svg xmlns="http://www.w3.org/2000/svg" width="135" height="135" viewBox="0 0 135 135" fill="none">
                    <g filter="url(#filter0_d_581_3070)">
                        <path d="M117.5 63.5C117.5 91.1142 95.1142 113.5 67.5 113.5C39.8858 113.5 17.5 91.1142 17.5 63.5C17.5 35.8858 39.8858 13.5 67.5 13.5C95.1142 13.5 117.5 35.8858 117.5 63.5Z" fill="#DBDEB9" />
                    </g>
                    <defs>
                        <filter id="filter0_d_581_3070" x="0.200001" y="0.200001" width="134.6" height="134.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="8.65" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.858824 0 0 0 0 0.870588 0 0 0 0 0.72549 0 0 0 1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_581_3070" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_581_3070" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <div className='icon-containerBis'>
                    <span className="material-symbols-outlined" style={{ fontSize: "34px", color: "white" }}>
                        {icon}
                    </span>
                </div>
            </div>

            {children}

        </ReactModal>
    );
}

export default Modal;