// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, 
        set, 
        ref, 
        update } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "./firebase.js"
import {creatingRegForm,
        creatingLogoutBtn
        
        } from "./functions.js";






// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);



const auth = getAuth();



// userio statuso patikrinimas

const user = auth.currentUser;

const registrationContainer = document.querySelector('.registration-form-container');

onAuthStateChanged(auth, (user) => {
    
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(user.uid)
        console.log('useris prisijunges')

        creatingLogoutBtn();

        const logOutBtn = document.querySelector(".logoutBtn");
        logOutBtn.addEventListener('click', logOutBtnFunction);


    } else {
        
        creatingRegForm();

        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');

        registerBtn.addEventListener('click', registerUserFunction);
        loginBtn.addEventListener('click', loginBtnFunction);
        
    }      
});




// <<FUNCTIONS>>

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

const registerUserFunction = (e)=> {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const passwd = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, passwd)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(`new user created ${user}`)

    const loginTime = new Date();
    set(ref(database, 'Users/' + user.uid), {
        email: email,
        role: 'simple_user',
        timestamp: `${loginTime}`
      });
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage)
  });
};

const loginBtnFunction = (e) => {
        e.preventDefault();
        const user_email = document.getElementById("email").value;
        const user_pass = document.getElementById("password").value;
        signInWithEmailAndPassword(auth, user_email, user_pass)
          .then((userCredential) => {
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });
};







