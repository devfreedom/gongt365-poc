var mapCard = document.getElementById("map-card");
var workoutCard = document.getElementById("workout-card");
var meetupCard = document.getElementById("meetup-card");
var profileCard = document.getElementById("profile-card");

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
    mapBtn.classList.remove('bg-slate-300');
    workoutBtn.classList.remove('bg-slate-300');
    meetupBtn.classList.remove('bg-slate-300');
    profileBtn.classList.add('bg-slate-300');
}


// TODO: [Implementation] Implement poi_equipments query filter
/*
const bodyParts = ["neck", "shoulder", "arm", "back", "chest", "abs", "waist", "thigh", "calf", "feet"]
const selectedBodyParts = []
function bodyPartsSelector(){
    for (var i = 0; i < bodyParts.length; i++) {
        if(document.getElementById(bodyParts[i]).classList.contains(toggleBtnOn) == true){
            if (!selectedBodyParts.includes(sfdasadf)) {
                // ✅ only runs if value not in array
                selectedBodyParts.push(str);
              }
            }
            else(){
                
            }
    }
}
*/

function trackCurrentPos(){

}


// Toggle button handler
// toggleBtnOn is a pre-defined custom CSS class for UI/UX; See /input.css
document.querySelectorAll('.toggleBtn').forEach(item => {
    item.addEventListener('click', event => {
        item.classList.toggle("toggleBtnOn");
    })
})


// Menu  handler
// toggleBtnOn is a pre-defined custom CSS class for UI/UX; See /input.css
document.querySelectorAll('.toggleBtn').forEach(item => {
    item.addEventListener('click', event => {
        item.classList.toggle("toggleBtnOn");
    })
})
