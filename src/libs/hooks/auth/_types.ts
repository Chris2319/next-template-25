import { User } from 'firebase/auth';

export type AuthCredentials = {
    email: string;
    password: string;
}

export type AuthState = {
    emailVerified: boolean;
    isAuthenticated: boolean;
    lastLoginDate: Date;
    role: UserRole;
    token: string | undefined;
}

export type UserRole = 'admin' | 'user';

export type AuthResponse = {
    authenticated: boolean;
    user: User | null;
    loading: boolean;
    userId: string;
}