function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    if (loginForm.classList.contains('active')) {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
    } else {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    }
}



let cars = [];
async function fetchCar() {
    try{
        const response = await fetch('http://localhost:8080/cars', {method: 'get'})         
        if(!response.ok){
            throw new Error('Failed to fetch car data');
        }
        cars = await response.json();
        displayCars()
    }catch (err){
        console.log('Error', err)
    }
    
}

function displayCars() {
    const carContainer = document.getElementById('car-container'); 
    carContainer.innerHTML = ''; // Clear any existing content in the container

    cars.forEach(car => {
        const carDiv = document.createElement('div'); 
        carDiv.classList.add('car'); 
        let carState = (car.state === 1) ? "Available" : "Unavailable";

        carDiv.innerHTML = `
            <img src="./carImages/${car.imagePath}" class = "car img" alt="${car.modelName}">
            <h3>${car.modelName} (${car.modelYear})</h3>
            <p>Brand: ${car.brandName}</p>
            <p>Plate: ${car.plate}</p> 
            <p>State: ${carState}</p> 
            <p>Price: $${car.dailyPrice}/day</p>
            <button>Book Now</button>
        `;

        carContainer.appendChild(carDiv); 
    });
}

fetchCar()