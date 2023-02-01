import {initializeApp} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const creatingLogoutBtn = ()=> {
    const logoutBtnContainer = document.querySelector('.logoutBtnContainer');
    logoutBtnContainer.innerHTML = `<i class="fa-solid fa-right-from-bracket logoutBtn"></i>`;
};

const logOutBtnFunction = (e) => {
    e.preventDefault();
    console.log('mygtukas vekia')
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch((error) => {
        // An error happened.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
};

export {creatingLogoutBtn, logOutBtnFunction}