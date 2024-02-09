"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

function Page() {
    const { data: session, status } = useSession();
    const [data, setData] = useState(null);


    useEffect(() => {
        if (session) {
            fetch(
                "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [session]);

    if (!session) return <div>Not logged in</div>;

    return (
        <div>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default Page;