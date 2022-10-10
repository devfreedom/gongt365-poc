
var profileCard = document.getElementById("profile-card");
var mapCard = document.getElementById("map-card");
var workoutCard = document.getElementById("workout-card");
var meetupCard = document.getElementById("meetup-card");

document.getElementById("profile-nav-btn").addEventListener("click", profileMenu);
document.getElementById("map-nav-btn").addEventListener("click", mapMenu);
document.getElementById("workout-nav-btn").addEventListener("click", workoutMenu);
document.getElementById("meetup-nav-btn").addEventListener("click", meetupMenu);

function profileMenu() {
    profileCard.setAttribute('class', 'w-full h-full');
    mapCard.setAttribute('class', 'w-full h-full hidden');
    workoutCard.setAttribute('class', 'w-full h-full hidden');
    meetupCard.setAttribute('class', 'w-full h-full hidden');
}

function mapMenu() {
    profileCard.setAttribute('class', 'w-full h-full hidden');
    mapCard.setAttribute('class', 'w-full h-full');
    workoutCard.setAttribute('class', 'w-full h-full hidden');
    meetupCard.setAttribute('class', 'w-full h-full hidden');
}

function workoutMenu() {
    profileCard.setAttribute('class', 'w-full h-full hidden');
    mapCard.setAttribute('class', 'w-full h-full hidden');
    workoutCard.setAttribute('class', 'w-full h-full');
    meetupCard.setAttribute('class', 'w-full h-full hidden');
}

function meetupMenu() {
    profileCard.setAttribute('class', 'w-full h-full hidden');
    mapCard.setAttribute('class', 'w-full h-full hidden');
    workoutCard.setAttribute('class', 'w-full h-full hidden');
    meetupCard.setAttribute('class', 'w-full h-full');
}