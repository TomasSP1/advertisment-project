import { creatingRegForm } from "./regFormModule.js";

function carouselRender() {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.innerHTML = `
    <div
    id="carouselExampleIndicators"
    class="carousel slide"
    data-bs-ride="carousel"
    >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="3"
        aria-label="Slide 4"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="4"
        aria-label="Slide 5"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="./images/img1.jpg"
          class="d-block w-100 carousel-img"
          alt="img1"
        />
        <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="./images/img2.jpg"
          class="d-block w-100 carousel-img"
          alt="img2"
        />
        <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="images/img3.jpg"
          class="d-block w-100 carousel-img"
          alt="img3"
        />
        <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
      <div class="carousel-item">
        <img
          src="images/img4.jpg"
          class="d-block w-100 carousel-img"
          alt="img4"
        />
        <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
      <div class="carousel-item">
        <img
          src="images/img5.jpg"
          class="d-block w-100 carousel-img"
          alt="img5"
        />
        <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    </div>
    <div class="d-flex flex-row-reverse align-items-center justify-content-between">
        <button class="btn btn-primary firstEntryBtn">Enter</button>
    </div>`

        const firstEntryBtn = document.querySelector('.firstEntryBtn');
        firstEntryBtn.addEventListener('click', ()=> {
            carouselContainer.style.display = 'none';
            creatingRegForm();
        })
}

export { carouselRender }