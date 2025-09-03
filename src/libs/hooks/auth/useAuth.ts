'use client';

import {useEffect, useState} from 'react';
import {onAuthStateChanged, User} from 'firebase/auth';
import {auth} from "@/libs/config/firebase.ts";
import { AuthResponse } from './_types.ts';

export const useAuth = (): AuthResponse => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthenticated(!!currentUser);
            setLoading(false);
        });
    }, []);

    return { authenticated, user, loading, userId: user?.uid ?? '' };
};