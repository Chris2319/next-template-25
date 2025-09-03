import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import {auth} from "@/libs/config/firebase.ts";
import { AuthState, UserRole } from './_types.ts';

export const useLoginWithGoogle = () => {
    const queryClient = useQueryClient();
    const googleProvider = new GoogleAuthProvider();
    
    // Add additional scopes and configuration
    googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
    googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });

    const mutation = useMutation({
        mutationFn: async (): Promise<AuthState> => {
            if (!auth) {
                throw new Error('Firebase Auth is not initialized');
            }

            try {
                const result: UserCredential = await signInWithPopup(auth, googleProvider);
                
                if (!result.user) {
                    console.error('No user data returned from Google login');
                    return {} as AuthState
                }

                const token = await result.user.getIdToken();
                const claims = await result.user.getIdTokenResult();
                
                // Get user role from custom claims, default to 'customer' if not set
                const userRole = (claims.claims.role as UserRole) || 'customer';

                return {
                    emailVerified: result.user.emailVerified,
                    isAuthenticated: true,
                    lastLoginDate: new Date(result.user.metadata.lastSignInTime || Date.now()),
                    role: userRole,
                    token: token
                };
            } catch {
                throw new Error('Firebase Auth is not initialized');
            }
        },
        onSuccess: async (data: AuthState) => {
            try {
                console.log('Google login successful', {
                    isAuthenticated: data.isAuthenticated,
                    role: data.role,
                    emailVerified: data.emailVerified,
                    lastLoginDate: data.lastLoginDate
                });

                return data;
            } catch (error) {
                console.error('Post-Google login processing error:', error);
                throw error;
            }
        },
        onError: (error: Error) => {
            console.error('Google login failed:', {
                name: error.name,
                message: error.message
            });
        },
    });

    return {
        ...mutation,
        queryClient
    };
}; 