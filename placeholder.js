const inputElement = document.getElementById("destinationInput");
inputElement.addEventListener("focus", function (){
    inputElement.placeholder = "";
});

inputElement.addEventListener("blur", function (){
    inputElement.placeholder="목적지 검색";
});

inputElement.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchParking();
    }
});

// 거리 옵션을 선택했을 때
document.querySelectorAll('#rangeDropdown ul')[0].addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('distance').innerText = event.target.innerText;
});

// 이용권 옵션을 선택했을 때
document.querySelectorAll('#rangeDropdown ul')[1].addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('ticket').innerText = event.target.innerText;
});

// 남은 주차면 옵션을 선택했을 때
document.querySelectorAll('#rangeDropdown ul')[2].addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('parkingSpaces').innerText = event.target.innerText;
});

//공지사항에서 옵션을 선택했을 때 ->제목, 내용, 제목
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
const dropdownButton = document.querySelector('.dropdown-toggle');

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        dropdownButton.textContent = item.textContent;
    });
});

function changeButtonText(text) {
    document.getElementById("noticeBtn").textContent = text;
}

// 조회수 기능
function viewsPlus() {
    // 클릭된 tr 요소를 찾습니다.
    var tr = event.target.closest('tr');

    // 클릭된 tr 요소의 views 값을 가져옵니다.
    var viewsElement = tr.querySelector('.views');
    var views = parseInt(viewsElement.innerText);

    // views 값을 1 증가시킵니다.
    views += 1;

    // 증가된 views 값을 다시 tr 요소의 views에 반영합니다.
    viewsElement.innerText = views;
}

//공지 클릭시 클릭한 공지 내용이 펼쳐짐
//제목 등록일: 조회수: /내용 /목록 보기 버튼
function showNotice() {
    // noticeV1 테이블 숨김 처리
    var noticeV1Table = document.getElementById("noticeV1");
    noticeV1Table.style.display = "none";

    //검색창 숨김 처리
    var searchWrap = document.getElementById("search-wrap");
    searchWrap.style.display = "none";
    //페이지네이션 숨김 처리
    var pagination = document.getElementById("pagination");
    pagination.style.display = "none";

    // noticeV2 테이블 나타나게 처리
    var noticeV2Table = document.getElementById("noticeV2");
    noticeV2Table.style.display = "table";

    //돌아가기 버튼
    var backBtn = document.getElementById("backBtn");
    backBtn.style.display="block";
}

function backFullNotice(){
    // noticeV1 테이블 숨김 처리
    var noticeV1Table = document.getElementById("noticeV1");
    noticeV1Table.style.display = "table"

    //검색창 숨김 처리
    var searchWrap = document.getElementById("search-wrap");
    searchWrap.style.display = "flex";

    //페이지네이션 숨김 처리
    var pagination = document.getElementById("pagination");
    pagination.style.display = "flex";

    // noticeV2 테이블 나타나게 처리
    var noticeV2Table = document.getElementById("noticeV2");
    noticeV2Table.style.display = "none";
    //돌아가기 버튼
    var backBtn = document.getElementById("backBtn");
    backBtn.style.display="none";
}