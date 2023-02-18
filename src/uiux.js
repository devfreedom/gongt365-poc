var mapView = document.getElementById("map-view");
var workoutView = document.getElementById("workout-view");
var meetupView = document.getElementById("meetup-view");
var profileView = document.getElementById("profile-view");

var mapHero = document.getElementById("map-hero");
var workoutHero = document.getElementById("workout-hero");
var meetupHero = document.getElementById("meetup-hero");
var profileHero = document.getElementById("profile-hero");

var mapBtn = document.getElementById("map-nav-btn");
var workoutBtn = document.getElementById("workout-nav-btn");
var meetupBtn = document.getElementById("meetup-nav-btn");
var profileBtn = document.getElementById("profile-nav-btn");

var mapWrapper = document.getElementById("map-wrapper");

// Nabivation bar handler
// Use unobstructive Javascript, don't use OnClick();
// TODO: [Improvement][Refactor] replace manual attribute assignment with iteration-based toggle switch

document.getElementById("map-nav-btn").addEventListener("click", mapMenu);
document.getElementById("workout-nav-btn").addEventListener("click", workoutMenu);
document.getElementById("meetup-nav-btn").addEventListener("click", meetupMenu);
document.getElementById("profile-nav-btn").addEventListener("click", profileMenu);

function mapMenu() {
    mapView.classList.remove('hidden');
    workoutView.classList.add('hidden');
    meetupView.classList.add('hidden');
    profileView.classList.add('hidden');

    mapHero.classList.remove('hidden');
    workoutHero.classList.add('hidden');
    meetupHero.classList.add('hidden');
    profileHero.classList.add('hidden');

    mapBtn.classList.add('bg-slate-300');
    workoutBtn.classList.remove('bg-slate-300');
    meetupBtn.classList.remove('bg-slate-300');
    profileBtn.classList.remove('bg-slate-300');
}

function workoutMenu() {
    mapView.classList.add('hidden');
    workoutView.classList.remove('hidden');
    meetupView.classList.add('hidden');
    profileView.classList.add('hidden');

    mapHero.classList.add('hidden');
    workoutHero.classList.remove('hidden');
    meetupHero.classList.add('hidden');
    profileHero.classList.add('hidden');

    mapBtn.classList.remove('bg-slate-300');
    workoutBtn.classList.add('bg-slate-300');
    meetupBtn.classList.remove('bg-slate-300');
    profileBtn.classList.remove('bg-slate-300');
}

function meetupMenu() {
    mapView.classList.add('hidden');
    workoutView.classList.add('hidden');
    meetupView.classList.remove('hidden');
    profileView.classList.add('hidden');

    mapHero.classList.add('hidden');
    workoutHero.classList.add('hidden');
    meetupHero.classList.remove('hidden');
    profileHero.classList.add('hidden');

    mapBtn.classList.remove('bg-slate-300');
    workoutBtn.classList.remove('bg-slate-300');
    meetupBtn.classList.add('bg-slate-300');
    profileBtn.classList.remove('bg-slate-300');
}

function profileMenu() {
    mapView.classList.add('hidden');
    workoutView.classList.add('hidden');
    meetupView.classList.add('hidden');
    profileView.classList.remove('hidden');

    mapHero.classList.add('hidden');
    workoutHero.classList.add('hidden');
    meetupHero.classList.add('hidden');
    profileHero.classList.remove('hidden');

    mapBtn.classList.remove('bg-slate-300');
    workoutBtn.classList.remove('bg-slate-300');
    meetupBtn.classList.remove('bg-slate-300');
    profileBtn.classList.add('bg-slate-300');
}


// Toggle button handler
// toggleBtnOn is a pre-defined custom CSS class for UI/UX; See ./input.css
document.querySelectorAll('.toggleBtn').forEach(item => {
    item.addEventListener('click', event => {
        item.classList.toggle("toggleBtnOn");
    })
})