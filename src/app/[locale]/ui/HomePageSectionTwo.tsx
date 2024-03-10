import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
function HomePageSectionTwo() {

    const t = useTranslations('SectionTwo');
    return (
        <div className='layout-sectionb'>
            <section className='picture-containerHomeB'>
                <div className='image-wrapper'>
                    <Image
                        src="/homePageSectionTwo.png"
                        width={979} // original width of the image
                        height={337} // original height of the image
                        alt="homepage"
                        layout="responsive"
                    />
                </div>
            </section>
            <h2 className='titleBis'>
                {t('findOutWhy')} <span className='br-fontbis'>Weddinvitation</span> {t('toManage')}
            </h2>
        </div>

    );
}


export default HomePageSectionTwo;