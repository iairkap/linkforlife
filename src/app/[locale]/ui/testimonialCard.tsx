import React from 'react';
import Image from 'next/image';
import "../sass/components/testimonialCard.scss";
interface Props {
    flexDirection: string;
    img: string;
    name: string;
    text: string;
    margin: string;
    extraction?: string;
    marginhe?: string;
    style?: object;
}

function TestimonialCard({ flexDirection, img, name, text, margin, extraction, style }: Props) {
    return (
        <main className={`${flexDirection} ${extraction}`} /* style={style} */>
            <div style={{ margin: margin }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="195" height="171" viewBox="0 0 195 171" fill="none">
                    <circle cx="7.5" cy="7.5" r="7.5" fill="#E9EADF" />
                    <circle cx="7.5" cy="46.5" r="7.5" fill="#E9EADF" />
                    <circle cx="7.5" cy="85.5" r="7.5" fill="#E9EADF" />
                    <circle cx="7.5" cy="124.5" r="7.5" fill="#E9EADF" />
                    <circle cx="7.5" cy="163.5" r="7.5" fill="#E9EADF" />
                    <circle cx="52.5" cy="7.5" r="7.5" fill="#E9EADF" />
                    <circle cx="52.5" cy="46.5" r="7.5" fill="#E9EADF" />
                    <circle cx="52.5" cy="85.5" r="7.5" fill="#E9EADF" />
                    <circle cx="52.5" cy="124.5" r="7.5" fill="#E9EADF" />
                    <circle cx="52.5" cy="163.5" r="7.5" fill="#E9EADF" />
                    <circle cx="97.5" cy="7.5" r="7.5" fill="#E9EADF" />
                    <circle cx="97.5" cy="46.5" r="7.5" fill="#E9EADF" />
                    <circle cx="97.5" cy="85.5" r="7.5" fill="#E9EADF" />
                    <circle cx="97.5" cy="124.5" r="7.5" fill="#E9EADF" />
                    <circle cx="97.5" cy="163.5" r="7.5" fill="#E9EADF" />
                    <circle cx="142.5" cy="7.5" r="7.5" fill="#E9EADF" />
                    <circle cx="142.5" cy="46.5" r="7.5" fill="#E9EADF" />
                    <circle cx="142.5" cy="85.5" r="7.5" fill="#E9EADF" />
                    <circle cx="142.5" cy="124.5" r="7.5" fill="#E9EADF" />
                    <circle cx="142.5" cy="163.5" r="7.5" fill="#E9EADF" />
                    <circle cx="187.5" cy="7.5" r="7.5" fill="#E9EADF" />
                    <circle cx="187.5" cy="46.5" r="7.5" fill="#E9EADF" />
                    <circle cx="187.5" cy="85.5" r="7.5" fill="#E9EADF" />
                    <circle cx="187.5" cy="124.5" r="7.5" fill="#E9EADF" />
                    <circle cx="187.5" cy="163.5" r="7.5" fill="#E9EADF" />
                </svg>
            </div>
            <aside className='picture-container'>
                <Image src={img} alt="testimonial" layout="fill" objectFit="cover" />
            </aside>
            <div className='text-contaoner-testi'>
                <p className='parragraph-text-test'>{text}</p>
                <h3>{name}</h3>
            </div>

        </main >
    );
}

export default TestimonialCard;