// 관심 주차장 등록과 관련된 js입니다

let searchResults = [];//주차장 검색 결과를 저장할 배열
let favoriteParkingInfo = []; // 관심 주차장의 정보를 저장하는 배열

function searchParking(){
    var destination = document.getElementById("destinationInput").value;
    //destination에 가까운 주차장을 검색결과를 받아옴->searchResults
    // searchResults << 0 : 주차장 이름, 1 : 거리, 2 : 주소, 3 : 전체주차면, 4 : 주차가능면, 5 : 평균대기시간

    searchResults = [["주차장 A", "100m", "서울시 강남구 역삼동 123-45", 100, 55, 5],
        //주차장 B는 꽉 차있는 시나리오 설명을 위해 남은 주차면수 0으로 설정
        ["주차장 B", "200m", "서울시 강남구 논현동 678-90", 150, 0, 13],
        ["주차장 C", "200m", "서울시 강남구 논현동 678-90", 150, 33, 7],
        ["주차장 D", "200m", "서울시 강남구 논현동 678-90", 150, 11], 8];
    // 추가 정보는 이곳에 배열로 추가


    document.getElementById('cardSection').style.display = "none";

    if (searchResults.length === 0) {
        document.getElementById('parkingResults').style.display = "block";
        document.getElementById('searchPlaceholder').style.display = "none";
        document.getElementById('noResultsMessage').style.display = "block";
    } else {
        document.getElementById('parkingResults').style.display = "block";
        document.getElementById('searchPlaceholder').style.display = "none";
        document.getElementById('noResultsMessage').style.display = "none";
        parkingResults.innerHTML = ""; // 이전 검색 결과를 초기화
        totalResults.innerHTML = "<h3>검색 결과: " + searchResults.length+"건</h3>";
        displaySearchResults(); // 검색 결과를 표시하는 함수로 대체해야 합니다.
    }
}

function displaySearchResults(){
    var parkingResults = document.getElementById("parkingResults");

    for (var i = 0; i < searchResults.length; i++) {
        var parkingInfo = document.createElement("div");
        parkingInfo.className = "parking-info";

        parkingInfo.innerHTML = "<strong>주차장 이름:</strong> " + searchResults[i][0] + "<br>" +
            "<strong>현재 위치와 거리:</strong> " + searchResults[i][1] + "<br>" +
            "<strong>주소:</strong> " + searchResults[i][2] + "<br>" +
            "<strong>전체 주차면:</strong> <span class='parking-lot'>" + searchResults[i][3] + "</span>";

        // 클릭한 주차장을 관심 주차장으로 등록
        (function(index) {
            parkingInfo.addEventListener("click", function() {
                // 관심 주차장의 정보를 객체로 변환하여 배열에 추가
                let parkingObj = {
                    name: searchResults[index][0],
                    address: searchResults[index][2]
                };

                // 중복 확인 -> 중복이 아닐때만 배열에 주차장 정보 추가
                if (!parkingInfoDuplicateCheck(parkingObj)) {
                    favoriteParkingInfo.push(parkingObj);
                }

                // 클릭된 주차장 정보를 로컬 스토리지에 저장
                saveFavoriteParkingInfoToLocalStorage();
            });
        })(i);

        parkingResults.appendChild(parkingInfo);
    }
}

// 관심 주차장 중복 확인
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
function saveFavoriteParkingInfoToLocalStorage() {
    localStorage.setItem('favoriteParkingInfo', JSON.stringify(favoriteParkingInfo));
}

// 로컬 스토리지에서 관심 주차장 배열을 가져오는 함수
function getFavoriteParkingInfoFromLocalStorage() {
    let data = localStorage.getItem('favoriteParkingInfo');
    return data ? JSON.parse(data) : [];
}

// 페이지가 로드될 때 로컬 스토리지에서 관심 주차장 배열을 가져옴
window.addEventListener('load', function() {
    favoriteParkingInfo = getFavoriteParkingInfoFromLocalStorage();
    // 관심 주차장 배열에 저장된 모든 주차장들에 대해 html 요소 생성
    favoriteParkingInfo.forEach(function(parking) {
        // 관심 주차장 이름과 주소를 변수에 저장
        var parkingName = parking.name;
        var parkingAddress = parking.address;

        // <div class="gray-box2">
        var div = document.createElement('div');
        div.className = 'gray-box2';

        // <button class="minus" onclick="removeElement()"><i class="fa-solid fa-circle-minus"></i></button>
        var button = document.createElement('button');
        button.className = 'minus';
        button.id = 'minusButton';
        var icon = document.createElement('i');
        icon.className = 'fa-solid fa-circle-minus';
        button.appendChild(icon);
        div.appendChild(button);

        // gray-box2>div
        var innerDiv = document.createElement('div');

        // <p className="text bold-text">주차장 이름</p>
        var p = document.createElement('p');
        p.className = 'text bold-text';
        p.textContent = parkingName;

        // <p className="text small-text">주차장 주소</p>
        var secondP = document.createElement('p');
        secondP.className = 'text small-text';
        secondP.textContent = parkingAddress;

        innerDiv.appendChild(p);
        innerDiv.appendChild(secondP);
        div.appendChild(innerDiv);

        var grayPartition2 = document.querySelector('.gray-partition2')
        grayPartition2.parentNode.insertBefore(div.cloneNode(true), grayPartition2);
    });
});

// - 버튼을 누르면 관심 주차장이 삭제됨
window.onload = function() {
    document.getElementById('minusButton')?.addEventListener("click", function() {
        // 클릭한 버튼의 부모 요소를 찾아서 해당 주차장 정보 추출
        var parentElement = findParentByClass(this, 'gray-box2');
        if (parentElement) {
            var parkingName = parentElement.querySelector('.bold-text').textContent;
            var parkingAddress = parentElement.querySelector('.small-text').textContent;

            // 관심 주차장 배열에서 해당 주차장 정보 삭제
            removeFavoriteParking(parkingName, parkingAddress);

            // 로컬 저장소에서 해당 주차장 정보 삭제
            removeFavoriteParkingFromLocalStorage(parkingName, parkingAddress);

            // 클릭한 버튼의 부모 요소를 찾아 html에서 삭제
            parentElement.parentNode.removeChild(parentElement);

            // 페이지를 새로고침하여 변경 사항 반영
            location.reload();
        }
    });
};

// 특정한 html 요소의 부모 요소를 찾는 함수
function findParentByClass(element, className) {
    while ((element = element.parentElement) && !element.classList.contains(className));
    return element;
}

// 관심 주차장 배열에서 삭제
function removeFavoriteParking(name, address) {
    for (var i = 0; i < favoriteParkingInfo.length; i++) {
        if (favoriteParkingInfo[i].name === name && favoriteParkingInfo[i].address === address) {
            favoriteParkingInfo.splice(i, 1);
            break;
        }
    }
}

// 로컬 저장소에서 관심 주차장 삭제
function removeFavoriteParkingFromLocalStorage(name, address) {
    var data = JSON.parse(localStorage.getItem('favoriteParkingInfo'));
    if (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name === name && data[i].address === address) {
                data.splice(i, 1);
                localStorage.setItem('favoriteParkingInfo', JSON.stringify(data));
                break;
            }
        }
    }
}