
var profileCard = document.getElementById("profile-card");
var mapCard = document.getElementById("map-card");
var workoutCard = document.getElementById("workout-card");
var meetupCard = document.getElementById("meetup-card");

// Nabivation bar handler
// Use unobstructive Javascript, don't use OnClick();
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


// Select boxes for current region

const provinceList = ['시/도', '서울특별시', '경기도', '인천광역시', '강원도', '충청북도', '충청남도', '세종특별시', '대전광역시', '전라북도', '전라남도', '광주광역시', '경상북도', '경상남도', '대구광역시', '부산광역시', '울산광역시', '제주특별자치도'];
const cityList = [['시/군/구'],
                ['시/군/구', '강남구', '관악구', '강동구', '강북구', '강서구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구'],
                ['시/군/구']];


let provinceListSelect = document.getElementById('select-province')
let cityListSelect = document.getElementById('select-city')

/* FIX THIS ISSUE

provinceList.addEventListener('change', cityTrigger)

function cityTrigger(){
    // 현재 선택한 시도의 index값을 알아냄
    let provinceIndex = provinceListSelect.selectedIndex;

    // 이미 등록된 목록은 제거
    // ex 서울시를 고르면 서울시에 해당하는 구군이 나오고
    // 또다른시를 고르면 그시에맞는 구가나올텐데 서울시의 구또한 같이 나오게된다.
    // 이를 방지하기위해 또다른시를 고른다면 while문을 추가해 전에 있던 시의 구/군을 제거해줘야한다.
    while(cityListSelect.lastChild){ // 구군목록에 option태그가 있는가 ?
        cityListSelect.removeChild(cityListSelect.lastChild);
    }
    // 선택한 시도에 대한 구군목록을 배열에서 가져와서
    // 구군select에 목록option으로 추가함
    // <select><option>강남구</option></select>
    // ex 위의 배열들을 변수 초기화할때 맞춰서 초기화해놨다.
    // 시/도 의 서울시의 배열위치가 1이라면 구/군의 서울시에 해당하는 구/군의 배열도 1이 되게
    for (let cityIndex of provinceListSelect[provinceIndex]){
        let optionHTML = document.createElement('option');
        let cityItems = document.createTextNode(cityIndex);
        opt.appendChild(cityItems);
        cityListSelect.appendChild(optionHTML);
    }
}

// 세번째 select 요소에 이벤트핸들러 등록
// 선택한 주소 ( 시도/구군/읍면동 ) 를 p요소를 이용해서 출력
cityList.addEventListener('change', showCurrentRegion);
let currentRegion = document.getElementById('currentRegion');

function showCurrentRegion(){
    currentRegion.innerHTML = provinceListSelect.value + cityListSelect.value;
}