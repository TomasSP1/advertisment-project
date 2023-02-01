function cleanAllTables() {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML = '';
}

function logoutCleanPage() {
    const logoutBtnContainer = document.querySelector('.logoutBtnContainer');
    const userTableContainer = document.querySelector('.userTableContainer');
    const categoryContainer = document.querySelector('.categoryContainer');

    logoutBtnContainer.innerHTML = '';
    userTableContainer.innerHTML = '';
    categoryContainer.innerHTML = '';
};

export{logoutCleanPage, cleanAllTables}