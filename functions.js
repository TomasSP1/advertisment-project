const mainContainer = document.querySelector('.main-container');

const creatingRegForm = () => {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML = 
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
};

// const creatingADSform = ()=> {
//     const adsContainer = document.querySelector('.ads-form-container');
//     adsContainer.innerHTML = 
//     `<div class="row justify-content-center">
//         <div class="col-md-5">
//             <div class="card">
//                 <h2 class="card-title text-center">Registration form</h2>
//                 <div class="card-body py-md-4">
//                     <form>
//                         <div class="form-group">
//                             <input type="text" class="form-control" id="ads-name" placeholder="ADS name">
//                     </div>
//                         <div class="form-group">
//                             <select class="form-select form-control" aria-label="Default select example">
//                                 <option value="" disabled selected>Select your category</option>
//                                 <option value="1">One</option>
//                                 <option value="2">Two</option>
//                                 <option value="3">Three</option>
//                             </select>
//                     </div>
//                         <div class="form-group">
//                             <textarea class="form-control" id="ads-about" rows="5"
//                             placeholder="ADS about..."></textarea>
//                         </div>
//                         <div class="form-group">
//                             <input type="number" class="form-control" id="price" placeholder="Price">
//                         </div>
//                         <div class="my-3">
//                             <input type="file" name="chooseFile" id="chooseFile">
//                         </div>
//                         <div class="d-flex flex-row align-items-center justify-content-between">
//                             <button class="btn btn-primary">Upload</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>`
// };

const creatingLogoutBtn = ()=> {
    const logoutBtnContainer = document.querySelector('.logoutBtnContainer');
    logoutBtnContainer.innerHTML = `<i class="fa-solid fa-right-from-bracket logoutBtn"></i>`;
};

// functions responsible for display of registered Users in table
let userNr = 0;



function AddItemToTable(email, role, date, key) {
    const userTableContainer = document.querySelector('.userTableContainer');

    userTableContainer.innerHTML = `<div class="container table-container my-5">
                                    <h2>Users:</h2>
                                    <table class="table table-bordered table-hover user-table">
                                        <thead>
                                            <th class="text-center">Nr</th>
                                            <th class="text-center">email</th>
                                            <th class="text-center">role</th>
                                            <th class="text-center">date</th>
                                            <th class=userDeleteIcon><i class="fa-solid fa-user-xmark"></i></th>
                                        </thead>
                                        <tbody class="tbody1"></tbody>
                                    </table>
                                </div>`
    
    const userMaintable = document.querySelector('.user-table');
    console.log(userMaintable);

    const tbody1 = document.querySelector('.tbody1');
    let trow = document.createElement('tr');
    trow.setAttribute('data-id', key)
    
    let td1 = document.createElement('td');
    td1.classList.add('text-center');
    
    let td2 = document.createElement('td');
    td2.classList.add('text-center');
    let td3 = document.createElement('td');
    td3.classList.add('text-center');
    let td4 = document.createElement('td');
    td4.classList.add('text-center');
    let td5 = document.createElement('td');
    td5.classList.add('deleteUserBtn');
  
    td1.innerHTML = ++userNr;
    td2.innerHTML = email;
    td3.innerHTML = role;
    td4.innerHTML = date;
    td5.innerHTML = `<i class="fa-solid fa-square-minus"></i>`
  
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
  
    tbody1.appendChild(trow);
    console.log(tbody1)
    userMaintable.appendChild(tbody1);
  }

  function AddAllItemsToTable(User, tbody1) {
    console.log(tbody1)
    userNr = 0;
    // tbody1.innerHTML = "";
  
      for (let i in User) {
        AddItemToTable(User[i].email, User[i].role, User[i].timestamp, i);
      }
  }
// end of functions responsible for display of registered Users in table

// functions responsible for display of categories in table
let catNo = 0;
const tbody2 = document.querySelector('.tbody2');

function AddCategoryToTable(category, key) {
  const categoryContainer = document.querySelector('.categoryContainer');

  categoryContainer.innerHTML = `<div class="container table-container my-5">
                                    <h2>Categories:</h2>
                                    <table class="table table-bordered table-hover category-table">
                                        <thead>
                                            <th class="text-center">Nr</th>
                                            <th class="categories-input-container"><input type="text" class="form-control category-input" 
                                            placeholder="Enter category..."><button class="btn btn-primary enterCategoryBtn">Enter</button></th>
                                            <th class=userDeleteIcon><i class="fa-solid fa-user-xmark"></i></th>
                                        </thead>
                                        <tbody class="tbody2"></tbody>
                                    </table>
                                </div>`

  const categoryTable = document.querySelector('.category-table')

  let trow = document.createElement('tr');
  trow.setAttribute('data-id', key);

  let td1 = document.createElement('td');
  td1.classList.add('text-center');

  let td2 = document.createElement('td');
  td2.classList.add('text-center');

  let td5 = document.createElement('td');
  td5.classList.add('delCategoryBtn');

  td1.innerHTML = ++catNo;
  td2.innerHTML = category;
  td5.innerHTML = `<i class="fa-solid fa-square-minus"></i>`
  
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td5);

  tbody2.appendChild(trow);
  categoryTable.appendChild(tbody2);

}

function AddAllItemsToCategoryTable(categories) {
  catNo = 0;
  tbody2.innerHTML = "";

    for (let i in categories) {
      AddCategoryToTable(categories[i].category, i);
    }
}  
// end of functions responsible for display of categories in table

export {creatingRegForm, creatingLogoutBtn, AddAllItemsToTable, AddAllItemsToCategoryTable}