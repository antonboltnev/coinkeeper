import { defineStore} from "pinia";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";

import { dataBase, auth } from '@/firebase.js'

import { userStore } from "@/store/user";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        register(user: any) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then(async (userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    this.isLoggedIn = true

                    // Add a new document in collection "cities"
                    await setDoc(doc(dataBase, "users", userCredential.user.uid), {
                        records: []
                    });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        },

        login(user: any) {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then(async (userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    this.isLoggedIn = true

                    const store = userStore()
                    await store.clearData()
                    await store.fetchDataFromDB()
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }
})