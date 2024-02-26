import React from 'react';
import icon from "../../../../public/shareRSVP.svg"
interface props {
    t: any;
    isWeddingsEmpty: boolean;
    handleOpenTokenModal: () => void;
    handleOpenModal: () => void;
    handleOpenGroupModal: () => void;


}


function HearderRSVP({ t, isWeddingsEmpty, handleOpenTokenModal, handleOpenModal, handleOpenGroupModal }: props) {

    const iconElement = (icon && typeof icon === 'object' && 'src' in icon)
        ? <img src={icon.src} height={icon.height} width={icon.width} style={{ filter: `blur(${icon.blurWidth}px ${icon.blurHeight}px)` }} />
        : icon;

    return (
        <div className='first-header'>
            <div>
                <h4 className='subtitle'>
                    {t("subtitle")}
                </h4>
                {
                    !isWeddingsEmpty &&
                    <button onClick={handleOpenTokenModal} className='button-chip' style={{ color: "#818369" }}>
                        {iconElement}
                        {t("shareRSVP")}</button>
                }
            </div>
            {
                !isWeddingsEmpty &&
                <div className='button-container-header-table'>
                    <button onClick={handleOpenModal} className="buttonPLus">
                        {t("addInv")}{" "}
                    </button>
                    <button onClick={handleOpenGroupModal} className='buttonPlusGroup'>{t("createGroup")}</button>
                </div>
            }
        </div>
    );
}

export default HearderRSVP;