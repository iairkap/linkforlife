'use client'

import { useSession } from 'next-auth/react'

export const User = () => {
    const { data: session } = useSession()
    console.log(session?.accessToken); // Aquí está tu token de acceso de Google

    console.log('Client Session', session)
    return <pre>{JSON.stringify(session)}</pre>
}