import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile as fbUpdateProfile,
    onAuthStateChanged,
    sendPasswordResetEmail,
    verifyPasswordResetCode,
    confirmPasswordReset
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log("onAuthStateChanged ->", currentUser);
        });
        return () => unsubscribe();
    }, []);


    const signup = async (email, password, name = "", photoURL = "") => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            if (name || photoURL) {
                await fbUpdateProfile(res.user, { displayName: name, photoURL: photoURL });
                try {
                    await res.user.reload();
                } catch (error) {
                    console.error("Failed to reload user profile:", error);
                }
                setUser(auth.currentUser);
            }
            return res;
        } finally {
            setLoading(false);
        }
    };
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
    };
    const googleLogin = async () => {
        setLoading(true);
        try {
            const res = await signInWithPopup(auth, googleProvider);
            try {
                await res.user.reload?.();
            } catch (error) {
                console.log(error)
            }
            setUser(auth.currentUser);
            return res;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth).finally(() => {
            setLoading(false);
            setUser(null);
        });
    };

    const updateUser = (profile) => {
        if (!auth.currentUser) return Promise.reject(new Error("No user"));
        setLoading(true);
        return fbUpdateProfile(auth.currentUser, profile).finally(() => setLoading(false));
    };

    const resetPassword = (email, actionCodeSettings = null) => {
        setLoading(true);
        const call = actionCodeSettings
            ? sendPasswordResetEmail(auth, email, actionCodeSettings)
            : sendPasswordResetEmail(auth, email);
        return call.finally(() => setLoading(false));
    };

    const verifyResetCode = (oobCode) => {
        setLoading(true);
        return verifyPasswordResetCode(auth, oobCode).finally(() => setLoading(false));
    };
    const confirmReset = (oobCode, newPassword) => {
        setLoading(true);
        return confirmPasswordReset(auth, oobCode, newPassword).finally(() => setLoading(false));
    };

    const value = {
        user,
        loading,
        signup,
        login,
        googleLogin,
        logout,
        updateUser,
        resetPassword,
        verifyResetCode,
        confirmReset,
        setUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
