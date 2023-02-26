import { creatingRegForm } from "./regFormModule.js";

function firstPageRender() {
    const headerContainer = document.querySelector('.headerContainer');
    headerContainer.style.display = 'none';
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.innerHTML = `
    <div class=advertismentName>
        <h5>Nr. 1 advertisment page in the world!</h5>
    </div>
    <div 
    id="carouselExampleIndicators"
    class="carousel slide"
    data-bs-ride="carousel">
        <div class="carousel-indicators">

            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1">
            </button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2">
            </button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3">
            </button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4">
            </button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="4"
                aria-label="Slide 5">
            </button>

        </div>
        <div class="carousel-inner">

            <div class="carousel-item active">
                <img
                src="./images/img1.jpg"
                class="d-block w-100 carousel-img"
                alt="img1"/>
                <div class="carousel-caption d-none d-md-block">
                    <h5>Nr. 1 advertisment page in the world!</h5>
                    <p>The leading page in the trade of items. Now its much easer to sell your items.</p>
                </div>
            </div>

            <div class="carousel-item">
                <img
                src="./images/img2.jpg"
                class="d-block w-100 carousel-img"
                alt="img2"
                />
                <div class="carousel-caption d-none d-md-block">
                    <h5>New modern simple design</h5>
                    <p>Now it is much easer to understand how to sell your items.</p>
                </div>
            </div>

            <div class="carousel-item">
                <img
                src="images/img3.jpg"
                class="d-block w-100 carousel-img"
                alt="img3"
                />
                <div class="carousel-caption d-none d-md-block">
                    <h5>100 000 active members</h5>
                    <p>Leading advertisment page in members community.</p>
                </div>
            </div>

            <div class="carousel-item">
                <img
                src="images/img4.jpg"
                class="d-block w-100 carousel-img"
                alt="img4"
                />
                <div class="carousel-caption d-none d-md-block">
                    <h5>Many options in your ads</h5>
                    <p>You can delete, update your ads and comment and like the ones you like the most !!</p>
                </div>
            </div>

            <div class="carousel-item">
                <img
                src="images/img5.jpg"
                class="d-block w-100 carousel-img"
                alt="img5"
                />
                <div class="carousel-caption d-none d-md-block">
                    <h5>Extra fast page</h5>
                    <p>When creating the page, the most modern technologies were taken into account so that the page would work as quickly as possible.</p>
                </div>
            </div>

        </div>

        <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>

        <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        
    </div>

    <div class="d-flex justify-content-center">
        <button class="btn btn-primary firstEntryBtn">Enter</button>
    </div>`

    const firstEntryBtn = document.querySelector('.firstEntryBtn');
    firstEntryBtn.addEventListener('click', () => {
        carouselContainer.style.display = 'none';
        headerContainer.style.display = 'block';
        creatingRegForm();
    })
}

export { firstPageRender }