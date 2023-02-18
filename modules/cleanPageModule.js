function cleanAllTables() {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML = '';
}

function logoutCleanPage() {
    const logoutBtnContainer = document.querySelector('.logoutBtnContainer');
    const userTableContainer = document.querySelector('.userTableContainer');
    const categoryContainer = document.querySelector('.categoryContainer');
    const mainAdsFormContainer = document.querySelector('.mainAdsFormContainer');
    const adsMainContainer = document.querySelector('.adsContainer');
    const filterContainerBtns = document.querySelector('.filter-btn-container');

    logoutBtnContainer.innerHTML = '';
    userTableContainer.innerHTML = '';
    categoryContainer.innerHTML = '';
    mainAdsFormContainer.innerHTML = '';
    adsMainContainer.innerHTML = '';
    filterContainerBtns.innerHTML = '';
};

function cleanRegForm() {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML = '';
}

export{logoutCleanPage, cleanAllTables, cleanRegForm}