var mapCard = document.getElementById("map-card");
var workoutCard = document.getElementById("workout-card");
var meetupCard = document.getElementById("meetup-card");
var profileCard = document.getElementById("profile-card");

var mapHero = document.getElementById("map-hero");
var workoutHero = document.getElementById("workout-hero");
var meetupHero = document.getElementById("meetup-hero");
var profileHero = document.getElementById("profile-hero");

var mapBtn = document.getElementById("map-nav-btn");
var workoutBtn = document.getElementById("workout-nav-btn");
var meetupBtn = document.getElementById("meetup-nav-btn");
var profileBtn = document.getElementById("profile-nav-btn");

// Nabivation bar handler
// Use unobstructive Javascript, don't use OnClick();
// TODO: [Improvement][Refactor] replace manual attribute assignment with iteration-based toggle switch

document.getElementById("map-nav-btn").addEventListener("click", mapMenu);
document.getElementById("workout-nav-btn").addEventListener("click", workoutMenu);
document.getElementById("meetup-nav-btn").addEventListener("click", meetupMenu);
document.getElementById("profile-nav-btn").addEventListener("click", profileMenu);

function mapMenu() {
    mapCard.classList.remove('hidden');
    workoutCard.classList.add('hidden');
    meetupCard.classList.add('hidden');
    profileCard.classList.add('hidden');

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
    mapCard.classList.add('hidden');
    workoutCard.classList.remove('hidden');
    meetupCard.classList.add('hidden');
    profileCard.classList.add('hidden');

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
    mapCard.classList.add('hidden');
    workoutCard.classList.add('hidden');
    meetupCard.classList.remove('hidden');
    profileCard.classList.add('hidden');

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
    mapCard.classList.add('hidden');
    workoutCard.classList.add('hidden');
    meetupCard.classList.add('hidden');
    profileCard.classList.remove('hidden');

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