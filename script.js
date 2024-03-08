new daum.roughmap.Lander({
    "timestamp" : "1709271375236",
    "key" : "2ibse",
    // "mapWidth" : "640",
    // "mapHeight" : "800"
}).render();

// 페이지가 로드될 때 signIn 값을 세션 저장소에서 가져옴
var signIn = sessionStorage.getItem("signIn") === "true";  //signIn 값이 true면 signIn 변수에 true가 할당, 그렇지 않다면 false가 할당됨

// 로그인 버튼을 누르면 signIn 값을 true로 설정하고 세션 저장소에 저장
document.getElementById("loginButton").addEventListener("click", function() {
    signIn = true;
    sessionStorage.setItem("signIn", "true");
});

// 로그아웃 버튼을 누르면 signIn 값을 false로 설정하고 세션 저장소에 저장
document.getElementById("logoutButton").addEventListener("click", function() {
    signIn = false;
    sessionStorage.setItem("signIn", "false");
});

// 뒤로가기 누르면 마이페이지 바로 호출됨
function myPageBackward() {
    location.href = "index.html";
    let myPageOffcanvas = new bootstrap.Offcanvas(document.getElementById("myPageOffcanvas"));
    myPageOffcanvas.show();
}

// 마이페이지 오프캔버스 호출 함수
function showmyPageOffCanvas() {
    let myPageOffcanvas = new bootstrap.Offcanvas(document.getElementById("myPageOffcanvas"));
    myPageOffcanvas.show();
}

// 오프캔버스 호출 함수 (로그인, 비로그인 상태에 따라 나타나는 오프캔버스가 다름)
function showOffcanvas() {
    // signIn이 true면 마이페이지 오프캔버스 호출
    if (signIn) {
        showmyPageOffCanvas();
    } // signIn 값이 false면 '로그인 페이지' 오프캔버스를 토글
    else {
        let loginOffcanvas = new bootstrap.Offcanvas(document.getElementById("loginOffcanvas"));
        loginOffcanvas.show();
    }
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