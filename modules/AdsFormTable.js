import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, remove, get, set} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth,} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


function adsContainer(adsName, category, adsText, price, photo, key) {
    const adsMainContainer = document.querySelector('.adsContainer');

    adsMainContainer.innerHTML += `
                        <div class="card photo-card" data-id=${key} style="width: 18rem;">
                            <img class="card-img-top" src=${photo} alt=${adsName}>
                            <div class="card-body">
                            <h3 class="card-title photo-title">${adsName}</h3>
                            <h5 class="card-title">${category}</h5>
                            <p class="card-text">${adsText}</p>
                            </div>
                            <div class="price-container">
                                <div class="price">${price}$</div>
                            </div>
                        </div>`
}

    function adsContainers() {

            get(ref(database, 'ads/')).then((snapshot) => { 
                const adsData = snapshot.val();

                for (let i in adsData) {
                    adsContainer(adsData[i].name, adsData[i].category, adsData[i].text, adsData[i].price, adsData[i].picture, i);
                    }
            })

    };
    




export {adsContainers}