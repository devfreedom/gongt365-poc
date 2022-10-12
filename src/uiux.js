
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

const provinceList = ['시/도', '서울특별시', '경기도', '인천광역시', '부산광역시'];
const cityList = [['-시/군/구-'],
                ['-시/군/구-','강남구','서초구','송파구'],
                ['-시/군/구-','광명시','구리시','성남시','수원시','고양시'],
                ['-시/군/구-', '연수구', '남동구'],
                ['-시/군/구-', '동래구', '해운대구','기장군']];


/* 참고용
let sido = document.getElementById('sido')
let gugun = document.getElementById('gugun')
let dong = document.getElementById('dong');

sido.addEventListener('change', makegu)

function makegu(){
    // 현재 선택한 시도의 index값을 알아냄
    let sidx = sido.selectedIndex;

    // 이미 등록된 목록은 제거
    // ex 서울시를 고르면 서울시에 해당하는 구군이 나오고
    // 또다른시를 고르면 그시에맞는 구가나올텐데 서울시의 구또한 같이 나오게된다.
    // 이를 방지하기위해 또다른시를 고른다면 while문을 추가해 전에 있던 시의 구/군을 제거해줘야한다.
    while(gugun.lastChild){ // 구군목록에 option태그가 있는가 ?
        gugun.removeChild(gugun.lastChild);
    }
    // 선택한 시도에 대한 구군목록을 배열에서 가져와서
    // 구군select에 목록option으로 추가함
    // <select><option>강남구</option></select>
    // ex 위의 배열들을 변수 초기화할때 맞춰서 초기화해놨다.
    // 시/도 의 서울시의 배열위치가 1이라면 구/군의 서울시에 해당하는 구/군의 배열도 1이 되게
    for (let gg of sgg[sidx]){
        let opt = document.createElement('option');
        let txt = document.createTextNode(gg);
        opt.appendChild(txt)
        gugun.appendChild(opt);
    }
}

// 두번째 SELECT 요소에 이벤트핸들러 등록
// 첫번째 항목에서 선택한 항목값과
// 두번째 항목에서 선택한 값을 이용해서 읍면동 출력
//포인트 0 : 핸들러명 - makedong
//포인트 1 : 변수명 of 배열명[시도][구군]
gugun.addEventListener('change', makedong);

function makedong() {
    let sidx = sido.selectedIndex;
    let gidx = gugun.selectedIndex;

    while(dong.lastChild) {
        dong.removeChild(dong.lastChild)
    }

    for ( let dg of ymd[sidx][gidx]){
        let opt = document.createElement('option')
        let txt = document.createTextNode(dg)
        opt.appendChild(txt);
        dong.appendChild(opt);
    }
}

// 세번째 select 요소에 이벤트핸들러 등록
// 선택한 주소 ( 시도/구군/읍면동 ) 를 p요소를 이용해서 출력
dong.addEventListener('change', showaddr);
let addr = document.getElementById('addr')
*/