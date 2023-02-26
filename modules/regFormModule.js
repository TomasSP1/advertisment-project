import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword, 
signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "../firebase.js"
import { universalModalFunctionality } from "../modules/universalModalModule.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Function responsible for rendering Login and Registration form
const creatingRegForm = () => {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML =
        `<div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <h2 class="card-title text-center">Login form</h2>
                <div class="card-body py-md-4">
                    <form>
                        <div class="form-group">
                            <input type="email" class="form-control" id="loginEmail" placeholder="Email" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="loginPassword" placeholder="Password" />
                        </div>
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <button class="btn btn-primary login-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <h2 class="card-title text-center">Registration form</h2>
                <div class="card-body py-md-4">
                    <form>
                        <div class="form-group">
                            <input type="email" class="form-control" id="regEmail" placeholder="Email" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="regPassword" placeholder="Password" />
                        </div>
                        <div class="d-flex flex-row-reverse align-items-center justify-content-between">
                            <button class="btn btn-primary register-btn">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`

    const loginBtnFunction = (e) => {
        e.preventDefault();
        const user_email = document.getElementById("loginEmail").value;
        const user_pass = document.getElementById("loginPassword").value;

        // checking if inputs are nor empty
        if (user_email.length < 6) {
            universalModalFunctionality('User email should be atleast 6 symbols');
        } else if (user_pass.length < 6) {
            universalModalFunctionality('User password should be atleast 6 symbols');
        } else {
            get(ref(database, 'Users/')).then((userSnapshot) => {
                const userData = userSnapshot.val();
                for (let data in userData) {
                    // checking if account is not blocked
                    if (user_email === userData[data].email && userData[data].banStatus === true) {
                        universalModalFunctionality('Your account is blocked');
                    }

                    // if account is not blocked he can login in
                    if (user_email === userData[data].email && userData[data].banStatus === false) {
                        signInWithEmailAndPassword(auth, user_email, user_pass)
                            .then((userCredential) => {
                                console.log(userCredential.user.email)

                            })
                            .catch((error) => {
                                const errorMessage = error.message;
                                console.log(errorMessage)
                            });
                    } 
                        
                    // if (user_email !== userData[data].email) {
                    //     alert('nera paskyros');
                    //     break;
                    // }
                }
            })
        }
    };

    const registerUserFunction = (e) => {
        e.preventDefault();
        
        const email = document.getElementById('regEmail').value;
        const passwd = document.getElementById('regPassword').value;
        
        if (email.length < 6) {
            universalModalFunctionality('User email should be atleast 6 symbols');
        } else if (passwd.length < 6) {
            universalModalFunctionality('User password should be atleast 6 symbols');
        } else {
            createUserWithEmailAndPassword(auth, email, passwd)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(`new user created ${user}`)
                    universalModalFunctionality('Your account was created!');

                    const loginTime = new Date();
                    set(ref(database, 'Users/' + user.uid), {
                        email: email,
                        role: 'simple_user',
                        timestamp: `${loginTime}`,
                        banStatus: false
                    });
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    universalModalFunctionality(errorMessage);
                    console.log(errorMessage)
                });
        }
    };

    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');

    registerBtn.addEventListener('click', registerUserFunction);
    loginBtn.addEventListener('click', loginBtnFunction);
};





export { creatingRegForm }