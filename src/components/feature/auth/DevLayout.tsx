'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const DevLayout = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAllowedHost, setIsAllowedHost] = useState<boolean>(false);

    useEffect(() => {
        const host = typeof window !== 'undefined' ? window.location.hostname : '';
        const isDevHost = /(localhost|127\.0\.0\.1|\.dev)$/i.test(host);

        if (isDevHost) {
            setIsAllowedHost(true);
        } else {
            router.replace('/');
        }
    }, [router]);

    return (
        <>
            {isAllowedHost ? children : null}
        </>
    );
};