const registrationContainer = document.querySelector('.registration-form-container');
const adsContainer = document.querySelector('.ads-form-container');







   

registrationContainer.innerHTML = 
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
                            <button class="btn btn-primary">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`

const loginBtn = document.querySelector('.login-btn');

console.log(loginBtn);

loginBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    registrationContainer.style.display = 'none';

    adsContainer.innerHTML = 
    `<div class="row justify-content-center">
    <div class="col-md-5">
        <div class="card">
            <h2 class="card-title text-center">Registration form</h2>
            <div class="card-body py-md-4">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="ads-name" placeholder="ADS name">
                   </div>
                    <div class="form-group">
                          <select class="form-select form-control" aria-label="Default select example">
                            <option value="" disabled selected>Select your category</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                        <input type="file" name="chooseFile" id="chooseFile">
                    </div>
                    <div class="d-flex flex-row align-items-center justify-content-between">
                        <button class="btn btn-primary">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`

});


