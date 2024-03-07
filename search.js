/*목적지 검색/거리지정->목적지에 가까운 주차장이 검색결과로()/주차장 이름,현재 위치와 거리, 주소, 전체주차면 | 주차가능면->있으면 주차결과 없으면 검색결과가 없습니다. 띄움->
->검색결과 중 특정한 주차장 하나를 클릭할시 지도에 위치가 나오면서 자세한 정보가 페이지에 나옴/주차장 이름, 주소, 전체주차면 | 주차가능면, 요금 정보, 운영 정보
->알림 설정 버튼을 누르면 표시가 된다.
->뒤로 가기 버튼을 누르면 자세한 정보가 사라지고 아까검색했던 주차정보들이 나옴
*/
let searchResults = [];//주차장 검색 결과를 저장할 배열
let currentIndex = -1; //현재 선택된 주차장의 인덱스
function searchParking(){
    var destination = document.getElementById("destinationInput").value;
    //destination에 가까운 주차장을 검색결과를 받아옴->searchResults

    searchResults = [["주차장 A", "100m", "서울시 강남구 역삼동 123-45", 100],
        ["주차장 B", "200m", "서울시 강남구 논현동 678-90", 150],
        ["주차장 C", "200m", "서울시 강남구 논현동 678-90", 150],
        ["주차장 D", "200m", "서울시 강남구 논현동 678-90", 150]];
    // 추가 정보는 이곳에 배열로 추가


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

        parkingInfo.addEventListener("click", function(index) {
            return function() {
                // 클릭된 주차장의 인덱스를 저장
                currentIndex = index;
                // 자세한 정보 표시
                showDetails();
            };
        }(i));


        parkingResults.appendChild(parkingInfo);
    }
}

function showDetails(){
    var detailsModalBody = document.getElementById("detailsModalBody");
    detailsModalBody.innerHTML = "<h3>주차장 이름: " + searchResults[currentIndex][0] + "</h3>" +
        "<strong>주소:</strong> " + searchResults[currentIndex][2] + "<br>" +
        "<strong>전체 주차면:</strong> " + searchResults[currentIndex][3] + "<br>" +
        "<strong>주차가능면:</strong> " + searchResults[currentIndex][3] + "<br>" +
        "<strong>요금 정보:</strong> " + "주차장마다 다름" + "<br>" +
        "<strong>운영 정보:</strong> " + "주차장마다 다름";

    var detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'), {});
    detailsModal.show();
}



