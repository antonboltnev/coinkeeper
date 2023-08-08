// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXsYQ0BgZ6uHODOlBia-irfJuTOuVC8Z4",
    authDomain: "coinkeeper-52339.firebaseapp.com",
    projectId: "coinkeeper-52339",
    storageBucket: "coinkeeper-52339.appspot.com",
    messagingSenderId: "442959009082",
    appId: "1:442959009082:web:88339623e52e7671846c03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app)

export {
    dataBase
}