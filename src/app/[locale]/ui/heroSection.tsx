import React from 'react';
import "../sass/pages/homePage.scss"
import Image from 'next/image';
import { useTranslations } from 'next-intl';

function HeroSection() {

    const t = useTranslations("HeroSection");
    return (
        <main className='hero-layout'>
            <article className='circleB'>
            </article>
            <article className='circleC'>
            </article>
            <div className='title'>
                <h1 className='title-page'>{t("manageYour")} <span className='br-font'>{t("wedding")}</span> {t("veryEasily")}</h1>
                <h2 className='sub-page'>{t("withOurWeddingPlanningSoftware")}</h2>
            </div>
            <section className='picture-containerHome'>
                <div className='image-wrapper'>
                    <Image
                        src="/homepage.png"
                        width={979} // original width of the image
                        height={337} // original height of the image
                        alt="homepage"
                        layout="responsive"
                    />
                </div>
                <footer className='buttonContainer-homePage'>
                    <button className='button-homepageA'>{t("exploreProduct")}</button>
                    <button className='button-homepageB'>{t("getStarted")}</button>
                </footer>
            </section>
        </main>
    );
}

export default HeroSection;