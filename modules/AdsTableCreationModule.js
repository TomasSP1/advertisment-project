import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, remove, get, set, update} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function adsTableCreation(userID) {
    
    const adsMainContainer = document.querySelector('.adsContainer');
        get(ref(database, 'ads/')).then((snapshot) => { 
            const adsData = snapshot.val();
            get(ref(database, 'Users/' + userID)).then((userSnapshot) => {
                const userData = userSnapshot.val();
                
                for (let j in adsData) {
                    if (userID === adsData[j].userID || userData.role === 'admin') {
                        adsMainContainer.innerHTML += `
                            <div class="card photo-card" data-id=${j} style="width: 18rem;">
                                <div class="photo-container">
                                    <img class="card-img-top" src=${adsData[j].picture} alt=${adsData[j].name}>
                                    <i class="fa-solid fa-square-minus adsDelI deleteAdsBtn"></i>
                                    <i class="fa-solid fa-square-pen adsUpdateI updateAdsBtn"></i>
                                    <i class="fa-solid fa-comment-dots commentBtn"></i>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title photo-title">${adsData[j].name}</h3>
                                    <h5 class="card-title">${adsData[j].category}</h5>
                                    <p class="card-text">${adsData[j].text}</p>
                                </div>
                                <div class="price-container">
                                    <div class="price">${adsData[j].price}$</div>
                                </div>
                            </div>`
                    } else {
                        adsMainContainer.innerHTML += `
                            <div class="card photo-card" data-id=${j} style="width: 18rem;">
                                <div class="photo-container">
                                    <img class="card-img-top" src=${adsData[j].picture} alt=${adsData[j].name}>
                                    <i class="fa-solid fa-square-minus adsDelI"></i>
                                    <i class="fa-solid fa-square-pen adsUpdateI"></i>
                                    <i class="fa-solid fa-comment-dots commentBtn"></i>
                                    
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title photo-title">${adsData[j].name}</h3>
                                    <h5 class="card-title">${adsData[j].category}</h5>
                                    <p class="card-text">${adsData[j].text}</p>
                                </div>
                                <div class="price-container">
                                    <div class="price">${adsData[j].price}$</div>
                                </div>
                            </div>`
                };
                
            }

            // function delAdsBtnsFunction() {
            // deleting ads from firebase
            const delAdsBtns = document.querySelectorAll('.deleteAdsBtn');

            delAdsBtns.forEach(btn => {
            btn.addEventListener('click', ()=> {
                const uniqueAdsBtnID = btn.parentElement.parentElement.getAttribute('data-id');
                get(ref(database, `ads/${uniqueAdsBtnID}`)).then((snapshot) => {
                  if (snapshot.exists()) {
                      remove(ref(database, `ads/${uniqueAdsBtnID}`))
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


            // update buttons
            const updateAdsBtns = document.querySelectorAll('.updateAdsBtn');
            
            updateAdsBtns.forEach(btn => {
                btn.addEventListener('click', ()=> {
                    const uploadAdsBtn = document.getElementById('uploadAdsBtn');
                    const nextUploadAdsBtn = document.getElementById('nextuploadAdsBtn');
                    uploadAdsBtn.style.display = 'none';
                    nextUploadAdsBtn.style.display = 'block';
                    const uniqueAdsBtnID = btn.parentElement.parentElement.getAttribute('data-id');
                    get(ref(database, `ads/${uniqueAdsBtnID}`)).then((snapshot) => {
                        
                        const adsData = snapshot.val();
                        const adsNameInput = document.getElementById('ads-name');
                        adsNameInput.value = adsData.name;
                        const adsTextareaInput = document.getElementById('ads-about');
                        adsTextareaInput.value = adsData.text;
                        const adsPriceInput = document.getElementById('price');
                        adsPriceInput.value = adsData.price;
                        const adsPictureInput = document.getElementById('picture-name');
                        adsPictureInput.value = adsData.picture;
                        const adsSelectInput = document.getElementById('form-selection');
                        adsSelectInput.value = adsData.category;
                        
                        nextUploadAdsBtn.addEventListener('click', (e)=> {
                            e.preventDefault();
                            update(ref(database, `ads/${uniqueAdsBtnID}`), {
                                name: adsNameInput.value,
                                category: adsSelectInput.value,
                                text: adsTextareaInput.value,
                                price: adsPriceInput.value,
                                picture: adsPictureInput.value
                            })
                            .then(()=> {
                                alert("Data updated successfully");
                                window.location.reload();
                            })
                            .catch((error)=> {
                                alert(error)
                            })
                        })
                        
                    })
                })
            })

            // modal wil start here
            const modalContainer = document.querySelector('.modal-container');
            console.log(modalContainer)
            const commentsModal = document.createElement('div');
            commentsModal.classList.add('commentsModal');
            console.log(commentsModal)
            modalContainer.appendChild(commentsModal);
            const commentBtns = document.querySelectorAll('.commentBtn');
            const modal = document.querySelector('.modal-overlay');
            const closeBtn = document.querySelector('.close-btn');
            commentBtns.forEach(btn => {
                btn.addEventListener('click', ()=> {
                    modal.classList.add('open-modal');
                })
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('open-modal');

                    // kad bet kur paspaudus uzsidarytu modalas
                    window.addEventListener('click', function(e) {
                        console.log(e.target)
                        console.log(modalContainer)
                    
                        if (e.target === modal) {
                            modal.classList.remove('open-modal');
                        }
                    })
                })
            })




            
        })
    });

    
}




export {adsTableCreation}