/*목적지 검색/거리지정->목적지에 가까운 주차장이 검색결과로()/주차장 이름,현재 위치와 거리, 주소, 전체주차면 | 주차가능면->있으면 주차결과 없으면 검색결과가 없습니다. 띄움->
->검색결과 중 특정한 주차장 하나를 클릭할시 지도에 위치가 나오면서 자세한 정보가 페이지에 나옴/주차장 이름, 주소, 전체주차면 | 주차가능면, 요금 정보, 운영 정보
->알림 설정 버튼을 누르면 표시가 된다.
->뒤로 가기 버튼을 누르면 자세한 정보가 사라지고 아까검색했던 주차정보들이 나옴
*/
function searchParking(){
    var destination = document.getElementById("destinationInput").value;
    //destination에 가까운 주차장을 검색결과를 받아옴->searchResults
    // searchResults << 0 : 주차장 이름, 1 : 거리, 2 : 주소, 3 : 전체주차면, 4 : 주차가능면, 5 : 평균대기시간

    searchResults = [["주차장 A", "100m", "서울시 강남구 역삼동 123-45", 100, 55, 5],
        //주차장 B는 꽉 차있는 시나리오 설명을 위해 남은 주차면수 0으로 설정
        ["주차장 B", "200m", "서울시 강남구 논현동 678-90", 150, 0, 13],
        ["주차장 C", "200m", "서울시 강남구 논현동 678-90", 150, 33, 7],
        ["주차장 D", "200m", "서울시 강남구 논현동 678-90", 150, 11, 8]];
    // 추가 정보는 이곳에 배열로 추가


    document.getElementById('cardSection').style.display = "none";
    document.getElementById('forecasting').style.display = "none";
    document.getElementById('search-section-h5').style.display = "none";

    if (searchResults.length === 0) {
        document.getElementById('parkingResults').style.display = "block";
        document.getElementById('searchPlaceholder').style.display = "none";
        document.getElementById('noResultsMessage').style.display = "block";
    } else {
        document.getElementById('parkingResults').style.display = "block";
        document.getElementById('searchPlaceholder').style.display = "none";
        document.getElementById('noResultsMessage').style.display = "none";
        parkingResults.innerHTML = ""; // 이전 검색 결과를 초기화
        totalResults.innerHTML = "<h5>🔍검색 결과: " + searchResults.length+"건</h5>";
        totalResults.style.paddingLeft = "10px";
        displaySearchResults(); // 검색 결과를 표시하는 함수로 대체해야 합니다.
    }
}

// function displaySearchResults(){
//     var parkingResults = document.getElementById("parkingResults");
//     var favoriteParkingInfo = getFavoriteParkingInfoFromLocalStorage();
//     var alarmParkingInfo = getAlarmInfoFromLocalStorage();
//
//     for (var i = 0; i < searchResults.length; i++) {
//         var parkingInfo = document.createElement("div");
//         parkingInfo.className = "parking-info";
//
//         parkingInfo.innerHTML = "<strong>주차장 이름:</strong> " + searchResults[i][0]+"<button id='bookmark-button2' class='btn btn-outline-primary btn-33 margin-left-10'><i class='bi bi-bookmark-star-fill'></i></button> " +
//             "<button id='alarm-button2' class='btn btn-outline-primary btn-33'><i class='bi bi-alarm'></i></button> </h3>"+"<br>" +
//             "<strong>현재 위치와 거리:</strong> " + searchResults[i][1] + "<br>" +
//             "<strong>주소:</strong> " + searchResults[i][2] + "<br>" +
//             "<strong>전체 주차면:</strong> <span class='parking-lot'>" + searchResults[i][3] + "</span>";
//
//         parkingInfo.addEventListener("click", function(index) {
//
//
//             return function() {
//                 // 클릭된 주차장의 인덱스를 저장
//                 currentIndex = index;
//                 // 자세한 정보 표시
//                 showDetails();
//             };
//         }(i));
//
//         // 버튼 클릭 이벤트 전파 막기
//         var bookmarkButton = parkingInfo.querySelector("#bookmark-button2");
//         var alarmButton = parkingInfo.querySelector("#alarm-button2");
//         bookmarkButton.addEventListener("click", function(event) {
//             event.stopPropagation();
//         });
//         alarmButton.addEventListener("click", function(event) {
//             event.stopPropagation();
//         });
//
//
//         parkingResults.appendChild(parkingInfo);
//     }
//
//
// }
function displaySearchResults(){
    var parkingResults = document.getElementById("parkingResults");
    var favoriteParkingInfo = getFavoriteParkingInfoFromLocalStorage();
    var alarmParkingInfo = getAlarmInfoFromLocalStorage();

    for (var i = 0; i < searchResults.length; i++) {
        var parkingInfo = document.createElement("div");
        parkingInfo.className = "parking-info";
        parkingInfo.id = "parking-info-" + i;
        parkingInfo.style.paddingLeft = "10px";

        // 각 버튼에 고유한 ID 부여
        parkingInfo.innerHTML = "<strong>주차장 이름:</strong> " + searchResults[i][0]+"<button id='bookmark-button2-" + i + "' class='btn btn-outline-primary btn-33 margin-left-10'><i class='bi bi-bookmark-star-fill'></i></button> " +
            "<button id='alarm-button2-" + i + "' class='btn btn-outline-primary btn-33'><i class='bi bi-alarm'></i></button> </h3>"+"<br>" +
            "<strong>현재 위치와 거리:</strong> " + searchResults[i][1] + "<br>" +
            "<strong>주소:</strong> " + searchResults[i][2] + "<br>" +
            "<strong>전체 주차면:</strong> <span class='parking-lot'>" + searchResults[i][3] + "</span>";

        parkingInfo.addEventListener("click", function(index) {
            return function() {
                // 클릭된 주차장의 인덱스를 저장
                currentIndex = index;
                // 자세한 정보 표시
                showDetails();
            };
        }(i));

        var bookmarkButton = parkingInfo.querySelector("#bookmark-button2-" + i);
        var alarmButton = parkingInfo.querySelector("#alarm-button2-" + i);

        bookmarkButton.addEventListener("click", function(index) {
            return function(event) {
                event.stopPropagation();
                bookmarkButtonClicked2(index, "bookmark-button2-" + index);
            };
        }(i));
        alarmButton.addEventListener("click", function(index) {
            return function(event) {
                event.stopPropagation();
                alarmButtonClicked2(index, "alarm-button2-" + index);
            };
        }(i));

        parkingResults.appendChild(parkingInfo);
    }

    // 주차장 정보를 모두 표시한 후에 버튼의 상태를 설정
// 주차장 정보를 모두 표시한 후에 버튼의 상태를 설정
    for (var i = 0; i < searchResults.length; i++) {
        var isAlarm = alarmParkingInfo.some(function(parking) {
            return parking.name === searchResults[i][0] && parking.address === searchResults[i][2];
        });
        var isFavorite = favoriteParkingInfo.some(function(parking) {
            return parking.name === searchResults[i][0] && parking.address === searchResults[i][2];
        });

        var parkingInfo = document.getElementById('parking-info-' + i);
        var alarmButton = parkingInfo.querySelector('#alarm-button2-' + i);
        var bookmarkButton = parkingInfo.querySelector('#bookmark-button2-' + i);

        if (isFavorite) {
            bookmarkButton.classList.remove('btn-outline-primary');
            bookmarkButton.classList.add('btn-primary');
        } else {
            bookmarkButton.classList.remove('btn-primary');
            bookmarkButton.classList.add('btn-outline-primary');
        }

        if (isAlarm) {
            alarmButton.classList.remove('btn-outline-primary');
            alarmButton.classList.add('btn-primary');
        } else {
            alarmButton.classList.remove('btn-primary');
            alarmButton.classList.add('btn-outline-primary');
        }
    }
}

function showDetails(){
    var detailsModalBody = document.getElementById("detailsModalBody");
    var parkingAvailable = searchResults[currentIndex][4] > 0 ? searchResults[currentIndex][4] : "현재 주차 불가능";
    var parkingText;
    var favoriteParkingInfo = getFavoriteParkingInfoFromLocalStorage();
    var alarmParkingInfo = getAlarmInfoFromLocalStorage();

    var isAlarm = alarmParkingInfo.some(function(parking) {
        return parking.name === searchResults[currentIndex][0] && parking.address === searchResults[currentIndex][2];
    });
    var isFavorite = favoriteParkingInfo.some(function(parking) {
        return parking.name === searchResults[currentIndex][0] && parking.address === searchResults[currentIndex][2];
    });

    if (searchResults[currentIndex][4] === 0) {
        parkingText = "불가능";
        var noParkingModal = new bootstrap.Modal(document.getElementById('noParkingModal'), {});
        setTimeout(function() {
            noParkingModal.show();
        }, 1000);
    }
    else {
        parkingText = "가능!";
    }
    var parkingProgress = Math.round((searchResults[currentIndex][4] / searchResults[currentIndex][3]) * 100);

    detailsModalBody.innerHTML = "<h3>" + searchResults[currentIndex][0] + " <span class='badge text-bg-secondary'> " + parkingText + "</span> " +
        "<button id='bookmark-button' class='btn btn-outline-primary'><i class='bi bi-bookmark-star-fill'></i></button> " +
        "<button id='alarm-button' class='btn btn-outline-primary'><i class='bi bi-alarm'></i></button> </h3>" +
        "<div class='progress'>" +
        "<div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style='width: " + parkingProgress + "%;' aria-valuenow='" + parkingProgress + "' aria-valuemin='0' aria-valuemax='100'>" + parkingProgress + "%</div>" +
        "</div>" +
        "<strong> <i class=\"bi bi-geo-alt\"></i> </strong> " + searchResults[currentIndex][2] + "<br>" +


        "<strong>전체 주차면:</strong> " + "<span class='badge text-bg-secondary'> " + searchResults[currentIndex][3] + "</span>" + "<br>" +
        "<strong>주차가능면:</strong> " + "<span class='badge text-bg-secondary'> " + searchResults[currentIndex][4] + "</span>" + "<br>" +

        "<p class='d-inline-flex gap-1' style='margin-top: 20px;'>" +
        "<a class='btn btn-outline-primary' data-bs-toggle='collapse' href='#feeInfo' role='button' aria-expanded='false' aria-controls='feeInfo'>운영 및 요금 정보 확인</a>" +
        "</p>" +
        "<div class='row'>" +
        "<div class='col'>" +
        "<div class='collapse' id='feeInfo'>" +
        "<div class='card card-body'>" +
        "기본 요금(시간) : 무료/10분\n" +
        "추가 요금(시간) : 1,000원/10분\n" +
        "경차/저공해자동차 할인율 : 50%\n" +
        "장애인 할인율 : 80%\n" +
        "국가유공자/고엽제후유증 할인율 : 80%\n" +
        "다자녀(세자녀) 할인율 : 50%\n" +

        "평일 운영시간 : 09:00 ~ 21:00\n" +
        "기타 정보\n" +
    "개방시간 - 오전 09:00~오후 21:00\n" +
    "운영시간 외, 토, 일, 공휴일 무료\n" +
        "장애인(8면), 나눔카(2면), 전기충전(6면), 조업(2면) 등은 일반차량이 주차 할 수 없어 현장정보와 다를 수 있음" +

    "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<br>" +

        "<strong>평균 대기 시간:</strong> " + searchResults[currentIndex][5] + "분<br>";



    var detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'), {});
    detailsModal._element.addEventListener('shown.bs.modal', function () {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

    detailsModal.show();
    var alarmButton = document.getElementById('alarm-button');
    alarmButton.addEventListener('click', alarmButtonClicked);

    var bookmarkButton = document.getElementById('bookmark-button');
    bookmarkButton.addEventListener('click', bookmarkButtonClicked);

    if (isFavorite) {
        bookmarkButton.classList.remove('btn-outline-primary');
        bookmarkButton.classList.add('btn-primary');
    } else {
        bookmarkButton.classList.remove('btn-primary');
        bookmarkButton.classList.add('btn-outline-primary');
    }

    if (isAlarm) {
        alarmButton.classList.remove('btn-outline-primary');
        alarmButton.classList.add('btn-primary');
    } else {
        alarmButton.classList.remove('btn-primary');
        alarmButton.classList.add('btn-outline-primary');
    }

}

// 아마 이건 없어도 될것같긴한데 일단 놔둠
window.onload = function() {
    searchResults = [["주차장 A", "100m", "서울시 강남구 역삼동 123-45", 100, 55, 5],
        //주차장 B는 꽉 차있는 시나리오 설명을 위해 남은 주차면수 0으로 설정
        ["주차장 B", "200m", "서울시 강남구 논현동 678-90", 150, 0, 13],
        ["주차장 C", "200m", "서울시 강남구 논현동 678-90", 150, 33, 7],
        ["주차장 D", "200m", "서울시 강남구 논현동 678-90", 150, 11, 8]];

    var cardSection = document.getElementById("cardSection");
    var cards = cardSection.getElementsByClassName("card");

    for (var i = 0; i < cards.length && i < searchResults.length; i++) {
        var card = cards[i];
        var parkingInfo = searchResults[i];

        var cardTitle = card.getElementsByClassName("card-title")[0];
        var cardText = card.getElementsByClassName("card-text")[0];

        cardTitle.textContent = parkingInfo[0];
        cardText.innerHTML = `
            거리: ${parkingInfo[1]}<br>
            주소: ${parkingInfo[2]}<br>
            전체 주차면: ${parkingInfo[3]}<br>
            주차 가능 면: ${parkingInfo[4]}<br>
            평균 대기 시간: ${parkingInfo[5]}분
        `;

        // 버튼 수정


    }
};

// 페이지가 로드될 때 cardSection의 내용을 초기화하는 함수
window.onload = function() {
    searchResults = [["주차장 A", "100m", "서울시 강남구 역삼동 123-45", 100, 55, 5],
        ["주차장 B", "200m", "서울시 강남구 논현동 678-90", 150, 0, 13],
        ["주차장 C", "200m", "서울시 강남구 논현동 678-90", 150, 33, 7],
        ["주차장 D", "200m", "서울시 강남구 논현동 678-90", 150, 11, 8]];

    var cardSection = document.getElementById("cardSection");
    var cards = cardSection.getElementsByClassName("card");

    for (var i = 0; i < cards.length && i < searchResults.length; i++) {
        var card = cards[i];
        var button = card.getElementsByClassName("btn")[0];
        button.className = "btn btn-primary btn-purple";

        button.removeAttribute("disabled");

        button.textContent = "상세정보 확인";

        var parkingInfo = searchResults[i];

        var cardTitle = card.getElementsByClassName("card-title")[0];
        var cardText = card.getElementsByClassName("card-text")[0];

        cardTitle.textContent = parkingInfo[0];
        cardText.innerHTML = `
            거리: ${parkingInfo[1]}<br>
            주소: ${parkingInfo[2]}<br>
            전체 주차면: ${parkingInfo[3]}<br>
            주차 가능 면: ${parkingInfo[4]}<br>
            평균 대기 시간: ${parkingInfo[5]}분
        `;

        // 카드에 클릭 이벤트 리스너 추가
        card.addEventListener("click", function(index) {
            return function() {
                // 클릭된 주차장의 인덱스를 저장
                currentIndex = index;
                // 자세한 정보 표시
                showDetails(currentIndex);
            };
        }(i));
    }
};


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

function changeButtonText(text) {
    document.getElementById("noticeRange").textContent = text;
}

function parkingInfoDuplicateCheck(parkingObj) {
    for (let i = 0; i < favoriteParkingInfo.length; i++) {
        if (favoriteParkingInfo[i].name === parkingObj.name &&
            favoriteParkingInfo[i].address === parkingObj.address) {
            return true; // 중복이면 true 반환
        }
    }
    return false; // 중복이 아니면 false 반환
}

// 관심 주차장 배열을 로컬 스토리지에 저장하는 함수


// 로컬 스토리지에서 관심 주차장 배열을 가져오는 함수
function getFavoriteParkingInfoFromLocalStorage() {
    let data = localStorage.getItem('favoriteParkingInfo');
    return data ? JSON.parse(data) : [];
}

function bookmarkButtonClicked() {
    var bookmarkButton = document.getElementById('bookmark-button');
    var favoriteParkingInfo = getFavoriteParkingInfoFromLocalStorage();


    // 현재 주차장 정보를 가져옴
    var currentParking = {
        name: searchResults[currentIndex][0],
        address: searchResults[currentIndex][2],
        // 필요한 경우 추가 정보를 여기에 추가
    };

    if (bookmarkButton.classList.contains('btn-outline-primary')) {
        // 북마크 버튼이 눌려지면, 현재 주차장을 favoriteParkingInfo 배열에 추가
        favoriteParkingInfo.push(currentParking);
        bookmarkButton.classList.remove('btn-outline-primary');
        bookmarkButton.classList.add('btn-primary');
    } else {
        // 북마크 버튼이 해제되면, 현재 주차장을 favoriteParkingInfo 배열에서 제거
        favoriteParkingInfo = favoriteParkingInfo.filter(function(parking) {
            return parking.name !== currentParking.name || parking.address !== currentParking.address;
        });
        bookmarkButton.classList.remove('btn-primary');
        bookmarkButton.classList.add('btn-outline-primary');
    }

    // 변경된 favoriteParkingInfo 배열을 로컬 스토리지에 저장
    localStorage.setItem('favoriteParkingInfo', JSON.stringify(favoriteParkingInfo));
}

function bookmarkButtonClicked2(index, buttonId) {
    var bookmarkButton = document.getElementById(buttonId);    var favoriteParkingInfo = getFavoriteParkingInfoFromLocalStorage();
    var favoriteParkingInfo = getFavoriteParkingInfoFromLocalStorage();

    // 선택된 주차장 정보를 가져옴
    var selectedParking = {
        name: searchResults[index][0],
        address: searchResults[index][2],
        // 필요한 경우 추가 정보를 여기에 추가
    };

    if (bookmarkButton.classList.contains('btn-outline-primary')) {
        // 북마크 버튼이 눌려지면, 선택된 주차장을 favoriteParkingInfo 배열에 추가
        favoriteParkingInfo.push(selectedParking);
        bookmarkButton.classList.remove('btn-outline-primary');
        bookmarkButton.classList.add('btn-primary');
    } else {
        // 북마크 버튼이 해제되면, 선택된 주차장을 favoriteParkingInfo 배열에서 제거
        favoriteParkingInfo = favoriteParkingInfo.filter(function(parking) {
            return parking.name !== selectedParking.name || parking.address !== selectedParking.address;
        });
        bookmarkButton.classList.remove('btn-primary');
        bookmarkButton.classList.add('btn-outline-primary');
    }

    // 변경된 favoriteParkingInfo 배열을 로컬 스토리지에 저장
    console.log(favoriteParkingInfo);
    localStorage.setItem('favoriteParkingInfo', JSON.stringify(favoriteParkingInfo));
}