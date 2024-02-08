"use client"

import React from 'react';
import Home from '../page';
import { usePathname } from 'next/navigation';
function Page() {

    const pathname = usePathname()
    console.log(pathname)


    return (


        <div>
            <Home />
        </div>
    );
}

export default Page;