// Functions responsible for clearing containers after operations
// CLeaning old functions infromation and preparing BODY, HEADER for new functions information

function cleanAllTables() {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML = '';
}

function headerCleanPage() {
    const logoutBtnContainer = document.querySelector('.logoutBtnContainer');
    const userTableContainer = document.querySelector('.userTableContainer');
    const categoryContainer = document.querySelector('.categoryContainer');
    const mainAdsFormContainer = document.querySelector('.mainAdsFormContainer');
    const adsMainContainer = document.querySelector('.adsContainer');
    const filterContainerBtns = document.querySelector('.filter-btn-container');
    const userHello = document.querySelector('.userHello')

    logoutBtnContainer.innerHTML = '';
    userTableContainer.innerHTML = '';
    categoryContainer.innerHTML = '';
    mainAdsFormContainer.innerHTML = '';
    adsMainContainer.innerHTML = '';
    filterContainerBtns.innerHTML = '';
    userHello.innerHTML = '';
};

function cleanRegForm() {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML = '';
}

export{headerCleanPage, cleanAllTables, cleanRegForm}