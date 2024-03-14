const inputElement = document.getElementById("destinationInput");


//공지 가상데이터
var noticesdata= [
    {
        "number":"1",
        "title": "주차정보안내시스템 교통유발부담금 경감 미적용 대상 주차장 안내",
        "date": "2024.03.10",
        "content": "안녕하세요. 주차정보안내시스템 입니다. 현재 교통유발부담금 감면을 받기위해..."
    },
    {
        "number":"2",
        "title": "주차정보안내시스템 03.15(금) 19:00 ~ 23:00 이용 제한 안내",
        "date": "2024.03.11",
        "content": "안녕하세요. 주차정보안내시스템 입니다. 클라우드센터 서버 보안장비 교체로 인한..."
    }
    // 더 많은 공지사항 객체를 추가할 수 있습니다.
];

let currentFilter = 'title';// 필터 기본값은 '제목'

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
function changeNoticeFilter(text, noticeFilter) {
    // 'noticeRange' 버튼의 텍스트를 변경
    document.getElementById('noticeRange').textContent = text;
    //이 필터 테스트에 따라서 제목, 내용, 제목+내용으로 공지를 불러옴
    currentFilter = noticeFilter;
}

// 필터 검색 실행 함수
function searchNotices() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredNotices = noticesdata.filter(notice => {
        if (currentFilter === 'title') {
            return notice.title.toLowerCase().includes(searchValue);
        } else if (currentFilter === 'content') {
            return notice.content.toLowerCase().includes(searchValue);
        } else if (currentFilter === 'TitleAndContent') {
            return notice.title.toLowerCase().includes(searchValue) || notice.content.toLowerCase().includes(searchValue);
        }
    });

    displayFilteredNotices(filteredNotices);
}

//
function displayFilteredNotices(filteredNotices){
    var noticesElement = document.getElementById('notices');
    noticesElement.innerHTML = ''; // 기존 내용을 지웁니다.

    filteredNotices.forEach(function(notice) {
        var tr = document.createElement('tr');
        //tr.setAttribute('onclick', 'viewsPlus(); showNotice();');

        var tdNumber = document.createElement('td');
        tdNumber.textContent = notice.number;

        var thTitle = document.createElement('th');
        var aTitle = document.createElement('a');
        aTitle.setAttribute('href', '#!');
        aTitle.textContent = notice.title;
        thTitle.appendChild(aTitle);

        var tdDate = document.createElement('td');
        tdDate.textContent = notice.date;

        var tdViews = document.createElement('td');
        tdViews.className = 'views';
        tdViews.textContent = '0'; // 조회수는 처음에는 0으로 설정

        tr.addEventListener('click', function() {
            viewsPlus(); // 조회수 증가 함수 호출
            showNotice(notice.number); // showNotice 함수에 notice.number를 인자로 전달(클릭때 어떤 상세정보를 보고싶은지 알기위해)
        });

        tr.appendChild(tdNumber);
        tr.appendChild(thTitle);
        tr.appendChild(tdDate);
        tr.appendChild(tdViews);

        noticesElement.appendChild(tr);
    });
}



// 조회수 기능
function viewsPlus() {
    // 클릭된 tr 요소를 찾습니다.
    var tr = event.target.closest('tr');

    // 클릭된 tr 요소의 views 값을 가져옵니다.
    var viewsElement = tr.querySelector('.views');
    var views = parseInt(viewsElement.innerText);
    var viewCount = document.getElementById("viewCount");

    // views 값을 1 증가시킵니다.
    views += 1;

    // 증가된 views 값을 다시 tr 요소의 views에 반영합니다.
    viewsElement.innerText = views;
    viewCount.innerText = views;
}





//공지 클릭시 클릭한 공지 내용이 펼쳐짐
//제목 등록일: 조회수: /내용 /목록 보기 버튼
function showNotice(noticeNumber) {
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


        // noticesData 배열에서 noticeNumber와 일치하는 number를 가진 객체 찾기
        var notice = noticesdata.find(function(notice) {
            return notice.number === noticeNumber;
        });

        if (!notice) {
            console.log("해당 번호의 공지사항을 찾을 수 없습니다.");
            return;
        }

        // 찾은 공지사항 객체의 데이터를 사용하여 상세보기 테이블 업데이트
        var noticeTitle = document.querySelector("#noticeV2 .no-title");
        //var noticeDate = document.querySelector("#noticeV2 .no-date");

        var noticeContent = document.querySelector("#noticeV2 tbody td");


    // 찾은 공지사항 객체의 데이터를 사용하여 상세보기 테이블 업데이트
    var noticeTitle = document.querySelector("#noticeV2 .no-title");
    var noticeContent = document.querySelector("#noticeV2 tbody td");

    // 데이터 채우기
    //<span>을 건들지 않게 텍스트만 업데이트
    // 제목만 업데이트
    noticeTitle.firstChild.textContent = notice.title;
    //<span>을 건들지 않게 텍스트만 업데이트
    // 등록일 업데이트
    document.querySelector("#noticeV2 .no-date").textContent = "등록일 : " + notice.date;

    //내용 업데이트
    noticeContent.textContent = notice.content;

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



