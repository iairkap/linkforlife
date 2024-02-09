"use client"

import React from 'react';
import Home from '../page';
import { usePathname } from 'next/navigation';
function Page() {

    const pathname = usePathname()


    return (


        <div>
            <Home />
        </div>
    );
}

export default Page;