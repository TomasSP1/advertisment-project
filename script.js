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
import { creatingRegForm, 
        creatingADSform,
        creatingLogoutBtn
        } from "./functions.js";






// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const auth = getAuth();









// userio statuso patikrinimas

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    const registrationContainer = document.querySelector('.registration-form-container');
    const loguoutBtnContainer = document.querySelector('.logoutBtn-container');
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(user.uid)
        console.log('useris prisijunges')
        registrationContainer.remove();
        creatingLogoutBtn();
        const logoutBtn = document.querySelector('.logoutBtn');
        console.log(logoutBtn);
        logoutBtn.addEventListener('click', logOutBtnFunction);
        


    } else {
        loguoutBtnContainer.remove();
        console.log('atsijunges');
        creatingRegForm();
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        loginBtn.addEventListener('click', login);
        registerBtn.addEventListener('click', register_user);


    }
});














// <<FUNCTIONS>>

const login = (e)=> {
    e.preventDefault();
    console.log('login mygtukas neveikia')
    const email = document.getElementById('email').value;
    const passwd = document.getElementById('password').value;
    const registrationContainer = document.querySelector('.registration-form-container');
    

    signInWithEmailAndPassword(auth, email, passwd)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('sekmingai vartotojas prisijunge');
        const loginTime = new Date();
        update(ref(database, 'Users/' + user.uid), {
            timestamp: `${loginTime}`
        });
        registrationContainer.remove();
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });
};



const register_user = (e)=> {
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

const logOutBtnFunction = ()=> {
    const logoutBtn = document.querySelector('.logoutBtn');
    console.log('paspaudus logout sekmingai islogino')
    logoutBtn.addEventListener('click', ()=> {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('signe out success')
        }).catch((error) => {
            // An error happened.
            console.log(errorMessage)
        });

    });
}



// // <<EVENT LISTENERS>>





