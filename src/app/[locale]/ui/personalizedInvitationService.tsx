import React from 'react';
import Image from 'next/image';
import "../sass/components/personalizedServiceInvitation.scss"
import { useTranslations } from 'next-intl';

function PersonalizedServiceInvitation() {

    const t = useTranslations('PersonalizedServiceInvitation');
    return (
        <main >
            <h3 className='title-page' style={{ textAlign: "center", fontWeight: "700" }}>{t("PersonalizedInvitationService")}</h3>
            <div className='imagen-relative' >
                <Image src={'/personalizedInvitationService.png'} alt="image" style={{ objectFit: "contain" }} width={1200} height={806} />
                <div className='image-absolute'>
                    <Image src={'/personalizedInvitationServiceB.png'} alt="image" width={648} height={478} />
                </div>
            </div>
            <p className='text-person'>{t("HighlightYourSpecil")}</p>
            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", marginTop: "2rem" }}>
                <button className='button-homepageB'>{t("IWantMyFreeInvitation")}</button>
            </div>

        </main >
    );
}

export default PersonalizedServiceInvitation;