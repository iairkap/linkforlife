import React from 'react';
import "../sass/pages/homePage.scss"
import Image from 'next/image';


function HeroSection() {
    return (
        <main className='hero-layout'>
            <article className='circleB'>
            </article>
            <article className='circleC'>
            </article>
            <div className='title'>
                <h1 className='title-page'>Manage your <span className='br-font'>wedding</span> very easily</h1>
                <h2 className='sub-page'>With our Wedding Planning Software!</h2>
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
                    <button className='button-homepageA'>Explore Product</button>
                    <button className='button-homepageB'>Get Started</button>
                </footer>
            </section>
        </main>
    );
}

export default HeroSection;