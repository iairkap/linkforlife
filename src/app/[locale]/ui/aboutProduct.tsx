import React from 'react';
import AboutCard from './aboutCard';
import { aboutCardObject } from '@/utils/abotCardObjext';
import "../sass/components/AboutCard.scss"


function AboutProduct() {
    return (
        <main className='about-product-layout'>
            <article>
                <h3>About the product</h3>
                <span>Planning a wedding can be overwhelming, but it doesn't have to be. Our app gives you all the tools you need to manage every detail of your wedding, from the budget to the guest list, seating assignments and much more. Simplify logistics and enjoy the walk to the altar more. Get to know some of our features</span>
            </article>
            <div className='about-card-container'>
                {aboutCardObject.map((card, index) => (
                    <AboutCard
                        key={index}
                        image={card.image}
                        title={card.title}
                        parragraph={card.parragraph}
                    />
                ))}
            </div>
            <button className='button-homepageB'>Get Started!</button>
        </main>
    );
}

export default AboutProduct;