import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, remove, get, set, update, push } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { firebaseConfig } from "../firebase.js";
import { universalModalFunctionality } from "./universalModalModule.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Main function which goes to the main.js
function adsTableCreation(userID) {
    get(ref(database, 'ads/')).then((snapshot) => {
        const firebaseData = snapshot.val();
        get(ref(database, 'Users/' + userID)).then((userSnapshot) => {
            const userData = userSnapshot.val();
            get(ref(database, `favorites/`)).then((favoriteSnapshot) => {
                const favoritesData = favoriteSnapshot.val();
                filterBtnsDisplay(firebaseData, userID);
                adsDisplay(firebaseData, favoritesData, userID);
            });
        });
    });
}

// Ads rendering function
function adsDisplay(firebaseData, favoritesData, userID) {
    const adsMainContainer = document.querySelector('.adsContainer');
    console.log(userID)
    for (let data in firebaseData) {

        let isFavorited = !!favoritesData && favoritesData[data + userID];
        let isOwnerOrAdmin = (userID === firebaseData[data].userID ||
            userID === 'tBmyoY8kdXUpDuoz5vnS1q1SsIe2');

        adsMainContainer.innerHTML += `
            <div class="card photo-card" data-id=${data} style="width: 18rem;">
                <div class="photo-container">
                    <img class="card-img-top" src=${firebaseData[data].picture} alt=${firebaseData[data].name}>
                    <div class="favorite-logo-container">
                        <i class="${isFavorited ? 'fa-solid' : 'fa-regular'} fa-star favoriteBtn" data-id=${data}></i>
                    </div>
                    <div class="fa-solid-container">
                        <i class="fa-solid fa-square-minus adsDelI ${isOwnerOrAdmin ? 'deleteAdsBtn' : ''}"></i>
                        <i class="fa-solid fa-square-pen adsUpdateI ${isOwnerOrAdmin ? 'updateAdsBtn' : ''}"></i>
                        <i class="fa-solid fa-comment-dots commentBtn"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title photo-title">${firebaseData[data].name}</h3>
                    <h5 class="card-title">${firebaseData[data].category}</h5>
                    <p class="card-text">${firebaseData[data].text}</p>
                </div>
                <div class="price-container">
                    <div class="price">${firebaseData[data].price}$</div>
                </div>
            </div>`
    };
    favoriteBtnsFunctionality(userID);
    modalComentFunctionality(userID);
    deleteAdsBtnFunctionality();
    updateAdsBtnsFunctionality();
};


function favoriteBtnsFunctionality(userID) {

    const favoriteBtns = document.querySelectorAll('.favoriteBtn');

    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            const adsUniqueID = btn.getAttribute('data-id');

            get(ref(database, 'favorites/' + adsUniqueID + userID)).then((snapshot) => {
                if (snapshot.exists()) {
                    remove(ref(database, 'favorites/' + adsUniqueID + userID))
                        .then(() => {

                            btn.classList.remove('fa-solid');
                            btn.classList.add('fa-regular');

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    set(ref(database, 'favorites/' + adsUniqueID + userID), {
                        adsID: adsUniqueID,
                        userID: userID
                    })
                        .then(() => {

                            btn.classList.remove('fa-regular');
                            btn.classList.add('fa-solid');

                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
        })
    })
}

// function for displaying filtering buttons
function filterBtnsDisplay(firebaseData, userID) {
    const filterBtnContainer = document.querySelector('.filter-btn-container');
    const categoriesList = ['all'];



    get(ref(database, 'categories/')).then((snapshot) => {
        const adsData = snapshot.val();

        for (let category in adsData) {
            if (!categoriesList.includes(adsData[category].category)) {
                categoriesList.push(adsData[category].category)
            }
        }
        categoriesList.forEach(category => {
            filterBtnContainer.innerHTML += `<button class="filter-btn btn btn-primary" type="button" data-id=${category}>${category}</button>`
        })

        filterBtnsFunctionality(firebaseData, userID);
        searchBtnFunctionality(firebaseData, userID)

    })
}


function filterBtnsFunctionality(firebaseData, userID) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const adsMainContainer = document.querySelector('.adsContainer');
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const category = e.currentTarget.dataset.id;
            adsMainContainer.innerHTML = '';
            get(ref(database, 'favorites/')).then((favsnapshot) => {
                const newFavoriteAdsData = favsnapshot.val();

                // We create an empty object to hold the filtered information from the ad database.
                let filteredFavData = {};

                for (const adID in firebaseData) {
                    if (category === firebaseData[adID].category) {
                        filteredFavData[`${adID}`] = firebaseData[adID];
                    } else if (category === 'all') {
                        filteredFavData[`${adID}`] = firebaseData[adID];
                    }
                }
                adsDisplay(filteredFavData, newFavoriteAdsData, userID)
            })
        })
    })
}

function searchBtnFunctionality(firebaseData, userID) {
    const filterBtnContainer = document.querySelector('.filter-btn-container');
    const searchInfoContainer = document.createElement('div');
    searchInfoContainer.classList.add('d-flex', 'flex-row', 'searchContainer');
    searchInfoContainer.innerHTML =
        `<input type="text" class="form-control" id="searchInput" placeholder="search by the name">
         <button class="btn btn-primary" id="searchAdsBtn">Search</button>`

    filterBtnContainer.appendChild(searchInfoContainer);

    const searchBtn = document.getElementById('searchAdsBtn');
    const adsMainContainer = document.querySelector('.adsContainer');
    // We create an empty object to hold the filtered information from the ad database.


    searchBtn.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput');

        if (searchInput.value.length < 3) {
            universalModalFunctionality('Please enter more than 3 symbols');
        } else {
            get(ref(database, 'favorites/')).then((favsnapshot) => {
                const newFavoriteAdsData = favsnapshot.val();
                let filteredFavData = {};
                adsMainContainer.innerHTML = '';
                for (const adID in firebaseData) {
                    if (Object.values(firebaseData[adID]).includes(searchInput.value)) {
                        filteredFavData[`${adID}`] = firebaseData[adID];
                    }
                }
                adsDisplay(filteredFavData, newFavoriteAdsData, userID);
                searchInput.value = '';
            })
        }

    })
}


function addCommentsHeader(adsID, userID) {

    const modalContainer = document.querySelector('.modal-container');
    modalContainer.innerHTML = `
            <button class="close-btn"><i class="fa-solid fa-rectangle-xmark"></i></button>
            <input type="text" class="form-control" id="commentInput" placeholder="Write your comment here...">
            <button class="btn btn-primary" id="commentBtn">Comment</button>
            <table class="table commentsTable">
            <thead>
                <tr>
                    <th scope="col" class="modal-th-num"><p class="d-flex justify-content-center">#</p></th>
                    <th scope="col" class="user-email modal-th-user-email"><p class="d-flex justify-content-center">User email</p></th>
                    <th scope="col" class="modal-th-user-comment"><p class="d-flex justify-content-center">Comment</p></th>
                    <th scope="col" class="modal-th-user-del-logo><p class="d-flex justify-content-center">Delete</p></th>
                </tr>
            </thead>
            <tbody class="commentsTbody"></tbody>
            </table>`

    const modal = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.close-btn');
    


    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open-modal');
    })

    // closing modal bu pressing not on modal but on document
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('open-modal');
        }
    })

    // closing modal by pressing ESC key
    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            modal.classList.remove('open-modal');
        }
    });


    // comments rendering using uniqueID
    modalCommentsRender(userID, adsID)
}

// comments deleting function
function delComment() {
    const commentDelBtns = document.querySelectorAll('.commentDelBtn');

    commentDelBtns.forEach(btn => {

        btn.addEventListener('click', () => {
            console.log('spaudziu')
            const uniqueAdsBtnID = btn.parentElement.getAttribute('data-id');
            console.log(uniqueAdsBtnID)
            get(ref(database, `comments/${uniqueAdsBtnID}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    remove(ref(database, `comments/${uniqueAdsBtnID}`))
                        .then(() => {
                            universalModalFunctionality('Data deleted successfully');
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    console.log("No data available")
                }
            })

        })
    })
}


// modal wil start here
function modalComentFunctionality(userID) {
    const modalContainer = document.querySelector('.modal-container');

    const commentsModal = document.createElement('div');
    commentsModal.classList.add('commentsModal');

    modalContainer.appendChild(commentsModal);
    const commentBtns = document.querySelectorAll('.commentBtn');
    const modal = document.querySelector('.modal-overlay');
    
    commentBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            modal.classList.add('open-modal');

            const uniquecommentBtnID = btn.parentElement.parentElement.parentElement.getAttribute('data-id');
            
            addCommentsHeader(uniquecommentBtnID, userID);

            // modal functioning when its open
            const commentBtn = document.getElementById('commentBtn');
            
            const commentInput = document.getElementById('commentInput');

            commentBtn.addEventListener('click', () => {
                
                get(ref(database, 'Users/' + userID)).then((userSnapshot) => {
                    const userData = userSnapshot.val();
                    set(push(ref(database, 'comments/')), {
                        adsID: uniquecommentBtnID,
                        userID: userID,
                        userEmail: userData.email,
                        comment: commentInput.value
                    })
                        .then(() => {
                            modalCommentsRender(userID, uniquecommentBtnID, commentInput);
                            commentInput.value = '';
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
            })
        })
    })
}

function deleteAdsBtnFunctionality() {
    // deleting ads from firebase
    const delAdsBtns = document.querySelectorAll('.deleteAdsBtn');

    delAdsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const uniqueAdsBtnID = btn.parentElement.parentElement.parentElement.getAttribute('data-id');
            get(ref(database, `ads/${uniqueAdsBtnID}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    remove(ref(database, `ads/${uniqueAdsBtnID}`))
                        .then(() => {
                            universalModalFunctionality('Your advertisement deleted successfully!');
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    console.log("No data available")
                }
            })

        })
    })
}

function updateAdsBtnsFunctionality() {
    // update buttons
    const updateAdsBtns = document.querySelectorAll('.updateAdsBtn');

    updateAdsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const uploadAdsBtn = document.getElementById('uploadAdsBtn');
            const nextUploadAdsBtn = document.getElementById('nextuploadAdsBtn');
            uploadAdsBtn.style.display = 'none';
            nextUploadAdsBtn.style.display = 'block';
            const uniqueAdsBtnID = btn.parentElement.parentElement.parentElement.getAttribute('data-id');
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

                nextUploadAdsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    update(ref(database, `ads/${uniqueAdsBtnID}`), {
                        name: adsNameInput.value,
                        category: adsSelectInput.value,
                        text: adsTextareaInput.value,
                        price: adsPriceInput.value,
                        picture: adsPictureInput.value
                    })
                        .then(() => {
                            universalModalFunctionality('Your advertisement updated succsessfully!');
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
            })
        })
    })
}

function modalCommentsRender(userID, uniquecommentBtnID) {
    let commentNum = 0;

    const commentsTbody = document.querySelector('.commentsTbody');
    commentsTbody.innerHTML = '';

    get(ref(database, `comments/`))
        .then((snapshot) => {
            const commentsData = snapshot.val();
            get(ref(database, 'Users/' + userID)).then((userSnapshot) => {
                const userData = userSnapshot.val();
                get(ref(database, 'ads/' + uniquecommentBtnID)).then((adsUserSnapshot) => {
                    const adsData = adsUserSnapshot.val();

                    for (let c in commentsData) {

                        if (commentsData[c].adsID === uniquecommentBtnID) {
                            let emailExistOrNo = !!commentsData[c].userEmail;
                            if (commentsData[c].userID === userID || userData.role === 'admin' || adsData.userID === userID) {
                                commentsTbody.innerHTML += `
                                <tr data-id=${c}>
                                    <th class="text-center" scope="row">${++commentNum}</th>
                                    <td class="text-center" >${emailExistOrNo ? commentsData[c].userEmail : 'Deleted user'}</td>
                                    <td class="text-center" >${commentsData[c].comment}</td>
                                    <td class="commentDelBtn text-center"><i class="fa-solid fa-square-minus"></i></td>
                                </tr>`

                                delComment();
                            } else {
                                commentsTbody.innerHTML += `
                                <tr>
                                    <th class="text-center" scope="row">${++commentNum}</th>
                                    <td class="text-center">${emailExistOrNo ? commentsData[c].userEmail : 'Deleted user'}</td>
                                    <td class="text-center">${commentsData[c].comment}</td>
                                    <td class="text-center"></td>
                                </tr>`
                            }
                        }
                    }
                })
            })
        })
}

export { adsTableCreation }