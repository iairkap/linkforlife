import React from 'react';
import { testimonialObject } from '@/utils/testimonialObject';
import TestimonialCard from './testimonialCard';
import { useTranslations } from 'next-intl';
import { extractLocaleFromPathName } from '../utils/getLocale';
import { usePathname } from 'next/navigation';
function Testimonios() {
    const t = useTranslations('Testimonios');
    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName);

    return (
        <div className='layout-test'>
            <h1>{t("Testimonials")}</h1>
            <div className='testimonials-card-container'>
                {testimonialObject.map((testimonial: { flexDirection: string; img: string; name: string; texten?: string; margin: string; textes?: string; texthe?: string; marginhe?: string }, index: number) => (
                    <TestimonialCard
                        key={index}
                        flexDirection={testimonial.flexDirection}
                        img={testimonial.img}
                        name={testimonial.name}
                        text={testimonial[`text${extraction}` as keyof typeof testimonial] || ''}
                        margin={testimonial.margin}
                        extraction={extraction}
                        style={extraction === "he" ? { marginRight: "30%" } : { marginLeft: "30%" }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Testimonios;