import React from 'react';
import AboutCard from './aboutCard';
import { aboutCardObject } from '@/utils/abotCardObjext';
import "../sass/components/AboutCard.scss"
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';

function AboutProduct() {
    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName);
    console.log(extraction)

    const t = useTranslations('AboutProduct');
    return (
        <main className='about-product-layout'>
            <article>
                <h3>{t("AboutProduct")}</h3>
                <span>{t("PlanningCanBeOverwhelming")}</span>
            </article>
            <div className='about-card-container'>
                {aboutCardObject.map((card, index) => (
                    <AboutCard
                        key={index}
                        image={card.image}
                        title={card[`title${extraction?.toUpperCase()}` as keyof typeof card]}
                        parragraph={card[`parragraph${extraction?.toUpperCase()}` as keyof typeof card]}
                    />
                ))}
            </div>
            <button className='button-homepageB'>{t("getStarted")}</button>
        </main>
    );
}

export default AboutProduct;