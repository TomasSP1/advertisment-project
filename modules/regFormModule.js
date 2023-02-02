import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth,
        createUserWithEmailAndPassword,  
        signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


const creatingRegForm = () => {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML = 
    `<div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card">
                <h2 class="card-title text-center">Registration form</h2>
                <div class="card-body py-md-4">
                    <form>
                        <div class="form-group">
                            <input type="email" class="form-control" id="email" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Password">
                        </div>
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <button class="btn btn-primary login-btn">Login</button>
                            <button class="btn btn-primary register-btn">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`

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

    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');

    registerBtn.addEventListener('click', registerUserFunction);
    loginBtn.addEventListener('click', loginBtnFunction);
};





export {creatingRegForm}