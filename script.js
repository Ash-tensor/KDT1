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

// 페이지가 로드될 때 signIn 값이 true면 마이페이지 오프캔버스를 호출
window.onload = function() {
    if (signIn) {
        let myPageOffcanvas = new bootstrap.Offcanvas(document.getElementById("myPageOffcanvas"));
        myPageOffcanvas.show();
    }
};

// 오프캔버스 호출 함수 (로그인, 비로그인 상태에 따라 나타나는 오프캔버스가 다름)
function showOffcanvas() {
    // signIn이 true면 마이페이지 오프캔버스 호출
    if (signIn) {
        let myPageOffcanvas = new bootstrap.Offcanvas(document.getElementById("myPageOffcanvas"));
        myPageOffcanvas.show();
    } // signIn 값이 false면 '로그인 페이지' 오프캔버스를 토글
    else {
        let loginOffcanvas = new bootstrap.Offcanvas(document.getElementById("loginOffcanvas"));
        loginOffcanvas.show();
    }
}


