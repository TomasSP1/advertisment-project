// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, 
        set, 
        ref, 
        update,
        child,
        get,
        remove } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
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


const dbRef = ref(getDatabase());

console.log(dbRef)



let stdNo = 0;
const tbody = document.querySelector('.tbody1');
console.log(tbody)

function AddItemToTable(email, role, date, key) {
  
  let trow = document.createElement('tr');
  trow.setAttribute('data-id', key)
  
  let td1 = document.createElement('td');

  
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  td5.classList.add('deleteUserBtn');

  td1.innerHTML = ++stdNo;
  td2.innerHTML = email;
  td3.innerHTML = role;
  td4.innerHTML = date;
  td5.innerHTML = `<i class="fa-solid fa-square-minus"></i>`

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);

  tbody.appendChild(trow);
}

function AddAllItemsToTable(User) {
  stdNo = 0;
  tbody.innerHTML = "";

    for (let i in User) {
      AddItemToTable(User[i].email, User[i].role, User[i].timestamp, i);
    }
}










  get(child(dbRef, 'Users/')).then((snapshot) => {
    
  
      const userData = snapshot.val();
  
      AddAllItemsToTable(userData);


      // selecting information delete button
      const deleteUserBtns = document.querySelectorAll('.deleteUserBtn');
      deleteUserBtns.forEach(btn => {
        btn.addEventListener('click', ()=> {
          const uniqueBtnID = btn.parentElement.getAttribute('data-id');
          get(child(dbRef, `Users/${uniqueBtnID}`)).then((snapshot) => {
            console.log(uniqueBtnID)
            if (snapshot.exists()) {
              remove(ref(database, `Users/${uniqueBtnID}`))
              .then(()=> {
                alert("Data deleted successfully")
                window.location.reload();
              })
              .catch((error)=> {
                alert(error);
              });
              } else {
                console.log("No data available")
              }
            })
          
          })
        })
  });  
  
        
        
 
      
      
  
  




