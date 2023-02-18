import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, remove, get, set } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { firebaseConfig } from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// functions responsible for display of registered Users in table
let userNr = 0;

function userTableHeader() {
  const userTableContainer = document.querySelector('.userTableContainer');

  userTableContainer.innerHTML = `<div class="container table-container my-5 card">
                                    <h2>Users:</h2>
                                    <table class="table table-bordered table-hover user-table">
                                        <thead>
                                            <th class="text-center">Nr</th>
                                            <th class="text-center">email</th>
                                            <th class="text-center">role</th>
                                            <th class="text-center">date</th>
                                            <th class=userDeleteIcon>Delete user</th>
                                            <th class=userDeleteIcon>Ban user</th>
                                        </thead>
                                        <tbody class="tbody1"></tbody>
                                    </table>
                                </div>`
};

function AddItemToTable(email, role, date, key) {

  const userMaintable = document.querySelector('.user-table');

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
  let td6 = document.createElement('td');
  td6.classList.add('banUserBtn');

  td1.innerHTML = ++userNr;
  td2.innerHTML = email;
  td3.innerHTML = role;
  td4.innerHTML = date;
  td5.innerHTML = `<i class="fa-solid fa-square-minus"></i>`
  td6.innerHTML = `<i class="fa-solid fa-ban"></i>`

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);

  tbody1.appendChild(trow);

  userMaintable.appendChild(tbody1);
};

function AddAllItemsToTable(User) {

  userNr = 0;

  for (let i in User) {
    if (User[i].role !== 'admin') {
      AddItemToTable(User[i].email, User[i].role, User[i].timestamp, i);
    }
  }
};

// end of functions responsible for display of registered Users in table

function deleteUserBtnsFunction() {
  // selecting information delete button
  const deleteUserBtns = document.querySelectorAll('.deleteUserBtn');
  deleteUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const uniqueBtnID = btn.parentElement.getAttribute('data-id');
      get(ref(database, `Users/${uniqueBtnID}`)).then((snapshot) => {
        console.log(uniqueBtnID)
        if (snapshot.exists()) {
          remove(ref(database, `Users/${uniqueBtnID}`))
            .then(() => {
              alert("Data deleted successfully")
              window.location.reload();
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          console.log("No data available")
        }
      })
    })
  })
};

function banUserBtnsFunctionality() {
  const banUserBtns = document.querySelectorAll('.banUserBtn');
  // const bannedUsers = [];
  banUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const userUniqID = btn.parentElement.getAttribute('data-id');
      
      // if (bannedUsers.indexOf(bandymas) === -1) {
      //   bannedUsers.push(bandymas)
      // }

      get(ref(database, 'bannedUsers/' + userUniqID)).then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, 'bannedUsers/' + userUniqID))
            .then(() => {
              console.log('userseris sekmingai atbanintas')
              // btn.classList.remove('fa-solid');
              // btn.classList.add('fa-regular');

            })
            .catch((error) => {
              alert(error);
            });
        } else {
          set(ref(database, 'bannedUsers/' + userUniqID), {
            userID: userUniqID
          })
            .then(() => {

              console.log('userseris sekmingai uzbanintas')

            })
            .catch((error) => {
              alert(error)
            })
        }
      })


    })
  })
}

function userTable() {
  get(ref(database, 'Users/')).then((snapshot) => {
    const userData = snapshot.val();
    userTableHeader();
    AddAllItemsToTable(userData);
    deleteUserBtnsFunction();
    banUserBtnsFunctionality()
  });
};

export { userTable }