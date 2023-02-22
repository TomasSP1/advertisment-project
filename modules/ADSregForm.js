import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, remove, get, set, push } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { firebaseConfig } from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
// const user = auth.currentUser;

function creatingAdsForm() {
    const mainAdsFormContainer = document.querySelector('.mainAdsFormContainer');
    mainAdsFormContainer.innerHTML = `
        <div class="row d-flex justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <h2 class="card-title text-center">Ads form</h2>
                    <div class="card-body py-md-4">
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" id="ads-name" placeholder="ADS name">
                            </div>
                            <div class="form-group">
                                <select class="form-select form-control" id="form-selection" aria-label="Default select example">
                                    <option value="Select your category" disabled selected>Select your category</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" id="ads-about" rows="5"
                                placeholder="ADS about..."></textarea>
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="price" placeholder="Price">
                            </div>
                            <div class="my-3">
                                <input type="text" class="form-control" id="picture-name" placeholder="Insert picture HTML...">
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-between">
                                <button class="btn btn-primary" id="uploadAdsBtn">Upload</button>
                                <button class="btn btn-primary" id="nextuploadAdsBtn">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

    const formSelection = document.getElementById('form-selection');
    get(ref(database, 'categories/')).then((snapshot) => {

        const categoriesList = snapshot.val();

        for (let i in categoriesList) {
            const categoryName = categoriesList[i].category;
            const option = document.createElement('option');
            option.id = 'option';
            option.value = i;
            option.innerText = categoryName;
            formSelection.appendChild(option);
        };
    });

    const adsNameInput = document.getElementById('ads-name');

    const adsSelectInput = document.getElementById('form-selection');
    const adsTextareaInput = document.getElementById('ads-about');
    const adsPriceInput = document.getElementById('price');
    const adsPictureInput = document.getElementById('picture-name');
    const uploadAdsBtn = document.getElementById('uploadAdsBtn');





    uploadAdsBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (adsNameInput.value.length < 3) {
            alert('name more than 3 symbols')
        } else if (adsSelectInput.value === 'Select your category') {
            alert('please select category')
        } else if (adsTextareaInput.value.length < 10) {
            alert('description should be atleast 10 symbols')
        } else if (adsPriceInput.value <= 0) {
            alert('price should be more than 0')
        } else if (adsPictureInput.value.length < 10) {
            alert('insert HTML photo link')
        } else {
            const user = auth.currentUser;
            console.log(adsPictureInput.value)
            set(push(ref(database, 'ads/')), {
                name: adsNameInput.value,
                category: adsSelectInput.value,
                text: adsTextareaInput.value,
                price: adsPriceInput.value,
                picture: adsPictureInput.value,
                userID: user.uid
            })
                .then(() => {
                    alert("Data added successfully")
                    window.location.reload();
                })
                .catch((error) => {
                    alert(error)
                })
        }
    });
};

export { creatingAdsForm }



