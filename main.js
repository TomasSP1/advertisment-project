// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "./firebase.js"

// IMPORTING OTHER MODULES
// import {creatingRegForm} from "./modules/regFormModule.js";     
import {userTable} from "./modules/userTableModule.js";
import {categoryTable} from "./modules/categoryTableModule.js";
import {headerCleanPage, cleanAllTables, cleanRegForm} from "./modules/cleanPageModule.js";
import {userRoleIdentifikcation} from "./modules/roleIdentificationModule.js";
import {creatingAdsForm} from "./modules/ADSregForm.js";
import {adsTableCreation} from "./modules/AdsTableCreationModule.js";
import { headerFuncionality } from "./modules/headerModule.js";
import { firstPageRender } from "./modules/firstPageRenderModule.js";




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
// checking user status
const user = auth.currentUser;



onAuthStateChanged(auth, (user) => {

  

  if (user) {
        
        headerCleanPage();

        adsTableCreation(user.uid);
        
        userRoleIdentifikcation().then(data => {

            if (data === 'admin') {
                console.log('admin log in')
                cleanRegForm();
                headerFuncionality(user.uid);
                userTable();
                categoryTable();
                creatingAdsForm();

            } else {
                console.log('simple user log in');
                cleanRegForm();
                cleanAllTables();
                headerFuncionality(user.uid);
                creatingAdsForm();
            }
        });
    } else {
        headerCleanPage();
        firstPageRender();
        // creatingRegForm();
    }      
});



