import React from 'react';
import { testimonialObject } from '@/utils/testimonialObject';
import TestimonialCard from './testimonialCard';


function Testimonios() {
    return (
        <div className='layout-test'>
            <h1>Testimonials</h1>
            <div className='testimonials-card-container'>
                {testimonialObject.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        flexDirection={testimonial.flexDirection}
                        img={testimonial.img}
                        name={testimonial.name}
                        text={testimonial.text}
                        margin={testimonial.margin}
                    />
                ))}
            </div>
        </div>
    );
}

export default Testimonios;