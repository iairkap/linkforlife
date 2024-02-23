"use client"
import React from 'react';
import SignUpPart2 from '../ui/signUpPart2';
import "../sass/pages/signup.scss"
import Image from 'next/image';
import backgroundSign from "../../../../public/backC.jpeg"
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';


function SignUpGooglePart2() {

    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName)



    return (
        <main className='main-container' dir={extraction === "he" ? "rtl" : "ltr"}>

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
                <h2 className='title'>Welcome!</h2>
                <div className='pagination'>
                    <div className="deactivepag">
                        <span>1</span>
                    </div>

                    <div className="activepag">
                        <span>2</span>
                    </div>
                </div>
                <SignUpPart2 />
            </section>
        </main>
    );
}

export default SignUpGooglePart2;