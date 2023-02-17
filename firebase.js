import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDgre8YB2Ecpw653Cq_eKRRwYqLwndX9Js",
    authDomain: "kitchensync-fd489.firebaseapp.com",
    projectId: "kitchensync-fd489",
    storageBucket: "kitchensync-fd489.appspot.com",
    messagingSenderId: "936969648905",
    appId: "1:936969648905:web:166cab95db56c18af271d8",
    measurementId: "G-T2R37D1CSQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db


 
