'use client';

import React, {useEffect, useState} from 'react';
import {useAuth} from "@/libs/hooks/auth/useAuth.ts";
import {AuthModal} from "@/components/feature/auth/AuthModal.tsx";

export const AuthLayout = ({children}: { children: React.ReactNode }) => {
    const {user, loading, authenticated} = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (!loading && !user && !authenticated) {
            setShowLoginModal(true);
        }
    }, [user, loading, authenticated]);

    return (
        <>
            {children}
            <AuthModal
                isOpen={showLoginModal}
                onCloseAction={() => setShowLoginModal(false)}
            />
        </>
    );
};