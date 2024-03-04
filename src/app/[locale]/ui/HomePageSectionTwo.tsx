import React from 'react';
import Image from 'next/image';

function HomePageSectionTwo() {
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
                Find out why more and more planners are choosing <span className='br-fontbis'>Weddinvitation</span> to manage their wedding and event planning businesses
            </h2>
        </div>
    );
}

export default HomePageSectionTwo;