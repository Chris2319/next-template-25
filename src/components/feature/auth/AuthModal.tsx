'use client';

import React, {useEffect} from 'react';
import {useLoginWithGoogle} from "@/libs/hooks/auth/useLoginWithGoogle.tsx";
import styles from './AuthModal.module.scss';
import {useAuth} from "@/libs/hooks/auth/useAuth.ts";

interface LoginModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
}

export const AuthModal: React.FC<LoginModalProps> = ({isOpen, onCloseAction}) => {
    const {authenticated} = useAuth();
    const {mutate: loginWithGoogle, isPending: isPendingGoogle, isSuccess: isSuccessGoggle} = useLoginWithGoogle()

    useEffect(() => {
        if (isSuccessGoggle) onCloseAction();
    }, [isSuccessGoggle, onCloseAction]);

    return (
        <dialog open={isOpen} onClose={onCloseAction}>
            <button onClick={() => !isPendingGoogle && loginWithGoogle()}>
                {isPendingGoogle ? 'Signing in...' : 'Sign in with Google'}
            </button>
        </dialog>
    );
}; 