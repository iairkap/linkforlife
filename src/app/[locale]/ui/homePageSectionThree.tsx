import React from 'react';
import Image from 'next/image';

function HomePageSectionThree() {
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
                Design your personalized wedding invitation website
                and receive confirmations from your guests!
            </h2>
        </div>
    );
}

export default HomePageSectionThree;