import React from 'react';
import Image from 'next/image';
import "../sass/components/AboutCard.scss"
interface Props {
    image: string;
    title: string;
    parragraph: string;
}

function AboutCard({ image, title, parragraph }: Props) {
    return (
        <div className='container-about'>
            <Image src={image} alt="image" width={323.89} height={265} />
            <h3>{title}</h3>
            <p>{parragraph}</p>
        </div>
    );
}

export default AboutCard;