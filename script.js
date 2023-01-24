// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries






import {firebaseConfig} from "./firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const auth = getAuth();



const registrationContainer = document.querySelector('.registration-form-container');
const adsContainer = document.querySelector('.ads-form-container');







   

registrationContainer.innerHTML = 
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






const email = document.getElementById('email');
    const passwd = document.getElementById('password');

    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');


const register_user = (e)=> {
    e.preventDefault();

    const email1 = email.value;
    const passwd1 = passwd.value;

    createUserWithEmailAndPassword(auth, email1, passwd1)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(`new user created ${user}`)

    const loginTime = new Date();
    set(ref(database, 'Users/' + user.uid), {
        email: email1,
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

    

}

registerBtn.addEventListener('click', register_user);


const login = (e)=> {
    e.preventDefault();

    const email1 = email.value;
    const passwd1 = passwd.value;

    signInWithEmailAndPassword(auth, email1, passwd1)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('sekmingai vartotojas prisijunge');
        const loginTime = new Date();
        update(ref(database, 'Users/' + user.uid), {
            timestamp: `${loginTime}`
        })
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });

}




loginBtn.addEventListener('click', login);


// userio statuso patikrinimas
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(user.uid)
        console.log('useris prisijunges')

    } else {
        console.log('atsijunges')
    }
})

const logoutBtn = document.querySelector('.logoutBtn');
logoutBtn.addEventListener('click', ()=> {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('signe out success')
      }).catch((error) => {
        // An error happened.
        console.log(errorMessage)
      });
      
})




// console.log(loginBtn);

// loginBtn.addEventListener('click', (e)=> {
//     e.preventDefault()
//     registrationContainer.style.display = 'none';

//     adsContainer.innerHTML = 
//     `<div class="row justify-content-center">
//     <div class="col-md-5">
//         <div class="card">
//             <h2 class="card-title text-center">Registration form</h2>
//             <div class="card-body py-md-4">
//                 <form>
//                     <div class="form-group">
//                         <input type="text" class="form-control" id="ads-name" placeholder="ADS name">
//                    </div>
//                     <div class="form-group">
//                           <select class="form-select form-control" aria-label="Default select example">
//                             <option value="" disabled selected>Select your category</option>
//                             <option value="1">One</option>
//                             <option value="2">Two</option>
//                             <option value="3">Three</option>
//                           </select>
//                    </div>
//                     <div class="form-group">
//                         <textarea class="form-control" id="ads-about" rows="5"
//                         placeholder="ADS about..."></textarea>
//                     </div>
//                     <div class="form-group">
//                         <input type="number" class="form-control" id="price" placeholder="Price">
//                     </div>
//                     <div class="my-3">
//                         <input type="file" name="chooseFile" id="chooseFile">
//                     </div>
//                     <div class="d-flex flex-row align-items-center justify-content-between">
//                         <button class="btn btn-primary">Upload</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
// </div>`

// });


