// firebaseConfig.js
import {initializeApp, getApps} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import {apiKey, authDomain, databaseURL, projectId, messagingSenderId, appId} from "@/libs/config/index.ts";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    messagingSenderId,
    appId,
};

// Initialize Firebase App
const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(firebaseApp);
const userId = auth.currentUser?.uid;

// Initialize Realtime Database
const db = getDatabase(firebaseApp);

// Export instances
export {auth, db, userId};