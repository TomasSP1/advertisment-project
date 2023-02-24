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


import {firebaseConfig} from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
// userio statuso patikrinimas
const user = auth.currentUser;

function headerFuncionality(userID) {
    creatingUserHello(userID);
    creatingLogoutBtn(); 
}


const creatingLogoutBtn = ()=> {
    const logoutBtnContainer = document.querySelector('.logoutBtnContainer');
    logoutBtnContainer.innerHTML = `<i class="fa-solid fa-right-from-bracket logoutBtn"></i>`;

    const logOutBtnFunction = (e) => {
      e.preventDefault();
      
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

    const logOutBtn = document.querySelector(".logoutBtn");
    logOutBtn.addEventListener('click', logOutBtnFunction);
};

const creatingUserHello = (userID)=> {
    const userHello = document.querySelector('.userHello');
    
    get(ref(database, 'Users/' + userID)).then((userSnapshot) => {
        const userData = userSnapshot.val();
        let userName = userData.email.replace(/@.*$/, "");
        let userRole = userData.role.replace("_", " ")
        userHello.innerHTML = `
        <p>Hello ${userName} !!!</p>
        <p>role: ${userRole}.</p>`
    });


}

export { headerFuncionality }