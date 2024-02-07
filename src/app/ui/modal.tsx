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
                <svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136" fill="none">
                    <g filter="url(#filter0_d_496_636)">
                        <circle cx="68" cy="64" r="50" fill="#FFEFEF" />
                    </g>
                    <defs>
                        <filter id="filter0_d_496_636" x="0.700001" y="0.700001" width="134.6" height="134.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="8.65" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.258333 0 0 0 0 0.258333 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_496_636" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_496_636" result="shape" />
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