import React from 'react';
import SignUpPart2 from '../ui/signUpPart2';
import "../sass/pages/signup.scss"
import Image from 'next/image';
import backgroundSign from "../../../public/backC.jpeg"


function Page(props) {

    return (
        <main className='main-container' dir='rtl'>
            <section className='pictureContainer'>
                <div className='overflow-picture-container'>

                    <Image
                        src={backgroundSign}
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </section>


            <section className='form'>
                <SignUpPart2 />
            </section>
        </main>
    );
}

export default Page;