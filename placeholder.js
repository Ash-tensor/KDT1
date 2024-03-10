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