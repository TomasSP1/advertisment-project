import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, remove, get, set, update, push} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
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
                                    <i class="fa-regular fa-star favoriteBtn" data-id=${j}></i>
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
                                    <i class="fa-regular fa-star favoriteBtn" data-id=${j}></i>
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


            // // fovoriteBtn
            const favoriteBtns = document.querySelectorAll('.favoriteBtn');
            console.log(favoriteBtns)
            favoriteBtns.forEach(btn => {
                btn.addEventListener('click', ()=> {
                    
                    const adsUniqueID = btn.getAttribute('data-id');

                    console.log(adsUniqueID)
                    
                    
                    
                    
                        get(ref(database, `favorites/${adsUniqueID}`)).then((snapshot) => {

                            console.log(snapshot)
                            if (snapshot.exists()) {
                                remove(ref(database, `favorites/${adsUniqueID}`))
                                .then(()=> {
                                alert("Data deleted successfully")
                                window.location.reload();
                                })
                                .catch((error)=> {
                                alert(error);
                                });
                                } else {
                                    set(push(ref(database, `favorites/${adsUniqueID}`)), {
                                        // adsID: adsUniqueID,
                                        userID: userID
                                        })
                                        .then(()=> {
                                            alert("Data added successfully")
                                            window.location.reload();
                                        })
                                        .catch((error)=> {
                                            alert(error)
                                    })
                                }
                            })
                        
                    














                    
                    



                })
            })




            // modal wil start here
            const modalContainer = document.querySelector('.modal-container');
            
            const commentsModal = document.createElement('div');
            commentsModal.classList.add('commentsModal');
           
            modalContainer.appendChild(commentsModal);
            const commentBtns = document.querySelectorAll('.commentBtn');
            const modal = document.querySelector('.modal-overlay');
            // const closeBtn = document.querySelector('.close-btn');
            commentBtns.forEach(btn => {
                btn.addEventListener('click', ()=> {
                    
                    modal.classList.add('open-modal');
                    

                   
                    
                    
                    const uniquecommentBtnID = btn.parentElement.parentElement.getAttribute('data-id');
                    addCommentsHeader(uniquecommentBtnID, userID);

                    

                     // modalo veikimas kai jis atsidaro
                     const commentBtn = document.getElementById('commentBtn');
                     const commentInput = document.getElementById('commentInput');

                    commentBtn.addEventListener('click', ()=> {
                        

                        set(push(ref(database, 'comments/')), {
                            adsID: uniquecommentBtnID,
                            userID: userID,
                            comment: commentInput.value
                            })
                            .then(()=> {
                                alert("Data added successfully")
                                window.location.reload();
                            })
                            .catch((error)=> {
                                alert(error)
                        })

                        

                    })


                    
                })
            
            })

        })
    });

    
}

function addCommentsHeader(adsID, userID) {
    
    const modalContainer = document.querySelector('.modal-container');

    

    modalContainer.innerHTML = `
            <input type="text" class="form-control" id="commentInput" placeholder="Write your comment here...">
            <button class="btn btn-primary" id="commentBtn">Comment</button>
            <button class="close-btn"><i class="fa-solid fa-rectangle-xmark"></i></button>
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody class="commentsTbody"></tbody>
            </table>`

    
    // const commentBtns = document.querySelectorAll('.commentBtn');
    const modal = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.close-btn');


    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open-modal');
    })

    // kad bet kur paspaudus uzsidarytu modalas
    window.addEventListener('click', function(e) {
        
        if (e.target === modal) {
            modal.classList.remove('open-modal');
        }
    })


    // komentaru atvaizdavimas pagal unikalu skelbima
    let commentNum = 0;

    const commentsTbody = document.querySelector('.commentsTbody');
    

    get(ref(database, `comments/`))
    .then((snapshot) => {
    const commentsData = snapshot.val();
        get(ref(database, 'Users/' + userID)).then((userSnapshot) => {
            const userData = userSnapshot.val();
            for (let c in commentsData) {
            

                if (commentsData[c].adsID === adsID) {
                    if(commentsData[c].userID === userID || userData.role === 'admin') {
                        commentsTbody.innerHTML += `
                            <tr data-id=${c}>
                                <th scope="row">${++commentNum}</th>
                                <td>${commentsData[c].userID}</td>
                                <td>${commentsData[c].comment}</td>
                                <td class="commentDelBtn"><i class="fa-solid fa-square-minus"></i></td>
                            </tr>`

                        delComment();
                    } else {
                        commentsTbody.innerHTML += `
                            <tr>
                                <th scope="row">${++commentNum}</th>
                                <td>${commentsData[c].userID}</td>
                                <td>${commentsData[c].comment}</td>
                                <td></td>
                            </tr>`
                    }
                    
                } 
            }
        })
    })
    
    .catch((error)=> {
        alert(error);
    });


    
    
}

// komentaru trinimo funkcija
function delComment() {
    const commentDelBtns = document.querySelectorAll('.commentDelBtn');
    console.log(commentDelBtns)
    commentDelBtns.forEach(btn => {
        console.log(btn)
        btn.addEventListener('click', ()=> {
            console.log('spaudziu')
            const uniqueAdsBtnID = btn.parentElement.getAttribute('data-id');
            console.log(uniqueAdsBtnID)
            get(ref(database, `comments/${uniqueAdsBtnID}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    remove(ref(database, `comments/${uniqueAdsBtnID}`))
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
}


// function favoriteBtn() {
    
// }





export {adsTableCreation}