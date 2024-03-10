import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
function HomePageSectionThree() {

    const t = useTranslations('SectionThree');

    return (
        <div className='layout-sectionb'>
            <section className='picture-containerHomeB'>
                <div className='image-wrapper'>
                    <Image
                        src="/homePageSectionThree.png"
                        width={979} // original width of the image
                        height={337} // original height of the image
                        alt="homepage"
                        layout="responsive"
                    />
                </div>
            </section>
            <h2 className='titleBisA'>
                {t("DesignYouPersonalized")}
            </h2>
        </div>
    );
}

export default HomePageSectionThree;