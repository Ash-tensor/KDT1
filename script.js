// 페이지가 로드될 때 signIn 값을 세션 저장소에서 가져옴
var signIn = sessionStorage.getItem("signIn") === "true";  //signIn 값이 true면 signIn 변수에 true가 할당, 그렇지 않다면 false가 할당됨

// signIn 값에 따라 버튼 레이블을 업데이트하는 함수
function updateButtonLabel() {
    if(signIn) { // signIn 값이 true면 버튼 레이블이 마이페이지로 표시됨
        document.getElementById("loginOrMypageButton").innerText = "마이 페이지";
    } else { // signIn 값이 false면 버튼 레이블이 로그인으로 표시됨
        document.getElementById("loginOrMypageButton").innerText = "로그인";
    }
}

// 로그인 버튼 누름 -> signIn 값을 true로 설정하고 세션 저장소에 저장 -> 사이드바 로드
document.getElementById("loginButton")?.addEventListener("click", function() {
    signIn = true;
    sessionStorage.setItem("signIn", "true");
    offCanvasLoad();
});

// 로그아웃 버튼을 누름 -> signIn 값을 false로 설정하고 세션 저장소에 저장 -> 사이드바 로드
document.getElementById("logoutButton")?.addEventListener("click", function() {
    signIn = false;
    sessionStorage.setItem("signIn", "false");
    offCanvasLoad();
});

// 뒤로가기(왼쪽 방향 화살표) 누름 -> 사이드바 로드
document.getElementById("leftArrow")?.addEventListener("click", function() {
    offCanvasLoad();
});


// index.html로 이동 -> 세션 저장소에 사이드바 플래그값 'true' 로 저장
function offCanvasLoad() {
    location.href = "index.html";
    sessionStorage.setItem("showOffcanvas", "true");
}

// 페이지 로드됐을 때 세션 저장소에 저장된 사이드바 플래그값이 'true'면 사이드바 호출 후 'false'로 다시 저장
window?.addEventListener('DOMContentLoaded', (event) => {
    updateButtonLabel();
    if (sessionStorage.getItem("showOffcanvas") === "true") {
        showOffcanvas();
        sessionStorage.setItem("showOffcanvas", "false");
    }
});

// 마이페이지 사이드바 호출 함수
function showmyPageOffCanvas() {
    let myPageOffcanvas = new bootstrap.Offcanvas(document.getElementById("myPageOffcanvas"));
    myPageOffcanvas.show();
}

// 로그인 사이드바 호출 함수
function showLoginOffCanvas() {
    let loginOffcanvas = new bootstrap.Offcanvas(document.getElementById("loginOffcanvas"));
    loginOffcanvas.show();
}

// 사이드바 호출 함수 (로그인, 비로그인 상태에 따라 나타나는 사이드바가 다름)
function showOffcanvas() {
    // signIn이 true면 마이페이지 사이드바 호출
    if (signIn) {
        showmyPageOffCanvas();
    } // signIn 값이 false면 로그인 사이드바 호출
    else {
        showLoginOffCanvas();
    }
}

// 주차장 검색 팝업창
function showPopup() {
    window.open("search-parkinglot.html", "주차장 검색", "width=500, height=500, left=100, top=50");
}


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

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('id8a7fe3873ef63').style.display = 'block';
    }, 1500);
});

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('id8a7fe3873ef63').style.display = 'block';
    }, 1500);
});