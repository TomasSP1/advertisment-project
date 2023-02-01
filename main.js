// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, 
        set, 
        ref, 
        update,
        child,
        get,
        remove,
        onValue } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "./firebase.js"


import {creatingRegForm, loginBtnFunction, registerUserFunction} from "./modules/regFormModule.js";
import {creatingLogoutBtn, logOutBtnFunction} from "./modules/logoutBtnModule.js"       
import {userTable} from "./modules/userTableModule.js";
import {categoryTable} from "./modules/categoryTableModule.js";
import {logoutCleanPage, cleanAllTables} from "./modules/cleanPageModule.js";




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
// userio statuso patikrinimas
const user = auth.currentUser;



onAuthStateChanged(auth, (user) => {
  
  if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(user.uid)
        console.log('useris prisijunges')
        cleanAllTables();
        creatingLogoutBtn();

        const logOutBtn = document.querySelector(".logoutBtn");
        logOutBtn.addEventListener('click', logOutBtnFunction);

        userTable();

        categoryTable();

    } else {

        logoutCleanPage();
        
        creatingRegForm();

        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');

        registerBtn.addEventListener('click', registerUserFunction);
        loginBtn.addEventListener('click', loginBtnFunction);
        
    }      
});



