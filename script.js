// script.js
const languageDropdown = document.querySelector('.language-dropdown');

languageDropdown.addEventListener('click', () => {
    alert('Language dropdown clicked!');
});
// carousel
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });

    dots.forEach((dot, i) => {
        dot.classList.remove("active");
    });
    dots[currentSlide].classList.add("active");
}

function moveSlide(step) {
    currentSlide += step;
    showSlide(currentSlide);
}

function setSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// touch sensor for latest auction

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".auction-card");

    // Add touch sensor interaction
    cards.forEach(card => {
        const buttons = card.querySelectorAll(".card-actions button");

        // Simulate actions on button click
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                const action = event.target.innerText;
                if (action.includes("👁️")) {
                    alert("View details action triggered!");
                } else if (action.includes("❤️")) {
                    alert("Item added to favorites!");
                } else if (action.includes("🔍")) {
                    alert("Zoom action triggered!");
                }
            });
        });

        // Highlight card on hover
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.3)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        });
    });
});

// order

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("order-tracking-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const orderId = document.getElementById("order-id").value;
        const billingEmail = document.getElementById("billing-email").value;

        if (orderId && billingEmail) {
            alert(`Order ID: ${orderId}\nBilling Email: ${billingEmail}\nTracking information will be displayed.`);
        } else {
            alert("Please fill out all fields.");
        }
    });
});

// cart 
function returnToShop() {
            window.location.href = '/shop'; // Replace '/shop' with your shop's URL
        }


// sign-in

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector(".login-btn");
    const registerBtn = document.querySelector(".register-btn");

    loginBtn.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Login form submitted!");
    });

    registerBtn.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Register form submitted!");
    });
});




// Initialize the first slide
showSlide(currentSlide);

// iphone 
// Current USD to INR exchange rate (example: 1 USD = 82 INR)
const exchangeRate = 82; 

// DOM elements
const bidInput = document.getElementById('bid-input');
const currentBidInr = document.getElementById('current-bid-inr');

// Function to convert and update INR value
function updateBidInINR() {
    const usdValue = parseFloat(bidInput.value);
    const inrValue = (usdValue * exchangeRate).toFixed(2);
    currentBidInr.textContent = `₹${inrValue}`;
}

// Event listeners for +/- buttons and input changes
document.querySelector('.minus').addEventListener('click', () => {
    if (bidInput.value > 0) {
        bidInput.value = (parseFloat(bidInput.value) - 1).toFixed(2);
        updateBidInINR();
    }
});

document.querySelector('.plus').addEventListener('click', () => {
    bidInput.value = (parseFloat(bidInput.value) + 1).toFixed(2);
    updateBidInINR();
});

bidInput.addEventListener('input', updateBidInINR);

// countdown 
document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    function startCountdown(endTime, countdownElement) {
        function updateTimer() {
            const now = new Date().getTime();
            const timeLeft = endTime - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                countdownElement.innerHTML = `
                    <div><span>${days}</span> Day${days !== 1 ? 's' : ''}</div>
                    <div><span>${hours}</span> Hour${hours !== 1 ? 's' : ''}</div>
                    <div><span>${minutes}</span> Minute${minutes !== 1 ? 's' : ''}</div>
                    <div><span>${seconds}</span> Second${seconds !== 1 ? 's' : ''}</div>
                `;
            } else {
                countdownElement.innerHTML = "<div>Auction Ended</div>";
                clearInterval(timerInterval);
            }
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    const auctionEndTime = new Date("2024-12-31T00:00:00Z").getTime();
    const countdownElement = document.querySelector('.countdown');
    startCountdown(auctionEndTime, countdownElement);

    // Bid Increment/Decrement Logic
    const bidInput = document.getElementById('bid-input');
    document.querySelector('.minus').addEventListener('click', () => {
        const currentValue = parseFloat(bidInput.value);
        bidInput.value = (currentValue - parseFloat(bidInput.step)).toFixed(2);
    });

    document.querySelector('.plus').addEventListener('click', () => {
        const currentValue = parseFloat(bidInput.value);
        bidInput.value = (currentValue + parseFloat(bidInput.step)).toFixed(2);
    });

    // Currency Conversion (to INR)
    const currentBidElement = document.getElementById('current-bid-inr');
    function convertToINR(usdAmount) {
        const exchangeRate = 82.5; // Example exchange rate
        return `₹${(usdAmount * exchangeRate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    }

    const currentBidUSD = 100; // Example USD value for the bid
    currentBidElement.textContent = convertToINR(currentBidUSD);
});


// Initialize INR value on page load
updateBidInINR();
// Auction end time in UTC
const auctionEndTimeUTC = new Date('2024-12-31T00:00:00Z');

// Convert UTC to IST
const options = { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'long' };
const auctionEndTimeIST = auctionEndTimeUTC.toLocaleString('en-IN', options);

// Display IST time
document.querySelector('.auction-end-time').textContent = `Auction ends: ${auctionEndTimeIST}`;
