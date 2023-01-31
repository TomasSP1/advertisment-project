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
import {creatingRegForm,
        creatingLogoutBtn,
        AddAllItemsToTable,
        AddAllItemsToCategoryTable
        } from "./functions.js";






// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);



const auth = getAuth();
const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');


// userio statuso patikrinimas

const user = auth.currentUser;


onAuthStateChanged(auth, (user) => {
    
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(user.uid)
        console.log('useris prisijunges')
        mainLoginFormContainer.innerHTML = '';
        creatingLogoutBtn();
        console.log(creatingLogoutBtn);

        const logOutBtn = document.querySelector(".logoutBtn");
        logOutBtn.addEventListener('click', logOutBtnFunction);

        // sita dalis atspausdina lentele su Userio duomenimis, taip pat leidzia trinti tiek is firebase tiek is lenteles
        get(ref(database, 'Users/')).then((snapshot) => {
          
          const userData = snapshot.val();

          AddAllItemsToTable(userData);


          // selecting information delete button
          const deleteUserBtns = document.querySelectorAll('.deleteUserBtn');
          deleteUserBtns.forEach(btn => {
            btn.addEventListener('click', ()=> {
              const uniqueBtnID = btn.parentElement.getAttribute('data-id');
              get(ref(database, `Users/${uniqueBtnID}`)).then((snapshot) => {
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

      const categoryBtn = document.querySelector('.enterCategoryBtn');
      const categoryInput = document.querySelector('.category-input');
      

      // saving category data to firebase

      categoryBtn.addEventListener('click', ()=> {
        console.log('paspaudziau')
        set(ref(database, 'categories/' + categoryInput.value), {
          category: categoryInput.value
        })
        .then(()=> {
          alert("Data added successfully")
        })
        .catch((error)=> {
          alert(error)
        })
      });



      // making functions to build catgeory tables from firebase
      get(ref(database, 'categories/')).then((snapshot) => {
          
        
        const userData = snapshot.val();
        console.log(userData)

        AddAllItemsToCategoryTable(userData);
        
        // deleting category from firebase
        const delCategoryBtns = document.querySelectorAll('.delCategoryBtn');
        delCategoryBtns.forEach(btn => {
          btn.addEventListener('click', ()=> {
            const uniqueBtnID = btn.parentElement.getAttribute('data-id');
            get(ref(database, `categories/${uniqueBtnID}`)).then((snapshot) => {
              if (snapshot.exists()) {
                  remove(ref(database, `categories/${uniqueBtnID}`))
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


    } else {
        
        
        creatingRegForm();

        const loginBtn = document.querySelector('.login-btn');
        console.log(loginBtn)
        const registerBtn = document.querySelector('.register-btn');

        registerBtn.addEventListener('click', registerUserFunction);
        loginBtn.addEventListener('click', loginBtnFunction);
        
    }      
});




// <<FUNCTIONS>>

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
        console.log('spaudziu mygtuka')
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





  



































 

