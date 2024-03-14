document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input[name="verificationMethod"]').forEach(function (elem) {
        elem.addEventListener("change", function () {
            var value = this.value;
            if (value === "email") {
                document.getElementById("emailVerificationContent").style.display = "block";
            } else {
                document.getElementById("emailVerificationContent").style.display = "none";
            }
        });
    });
});


document.getElementById("chknum")?.addEventListener("click", function () {
    alert("인증번호를 성공적으로 발송하였습니다.");
});

document.getElementById("chknum1")?.addEventListener("click", function () {
    alert("인증번호를 성공적으로 발송하였습니다.");
});

document.getElementById("chknum2")?.addEventListener("click", function () {
    alert("인증번호를 성공적으로 발송하였습니다.");
});

// 페이지가 로드될 때 signIn 값을 세션 저장소에서 가져옴
var signIn = sessionStorage.getItem("signIn") === "true";  //signIn 값이 true면 signIn 변수에 true가 할당, 그렇지 않다면 false가 할당됨

// signIn 값에 따라 버튼 레이블을 업데이트하는 함수
function updateButtonLabel() {
    if (signIn) { // signIn 값이 true면 버튼 레이블이 마이페이지로 표시됨
        document.getElementById("loginOrMypageButton").innerText = "마이 페이지";
    } else { // signIn 값이 false면 버튼 레이블이 로그인으로 표시됨
        document.getElementById("loginOrMypageButton").innerText = "로그인";
    }
}

// 로그인 버튼 누름 -> signIn 값을 true로 설정하고 세션 저장소에 저장 -> 사이드바 로드
document.getElementById("loginButton")?.addEventListener("click", function () {
    signIn = true;
    sessionStorage.setItem("signIn", "true");
    offCanvasLoad();
});

// 로그아웃 버튼을 누름 -> signIn 값을 false로 설정하고 세션 저장소에 저장 -> 사이드바 로드
document.getElementById("logoutButton")?.addEventListener("click", function () {
    signIn = false;
    sessionStorage.setItem("signIn", "false");
    offCanvasLoad();
});

// 뒤로가기(왼쪽 방향 화살표) 누름 -> 사이드바 로드
document.getElementById("leftArrow")?.addEventListener("click", function () {
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

document.getElementById("findid")?.addEventListener("click", function () {
    var inputVal = document.getElementById("userInput").value;
    if (inputVal === "w") {
        alert("존재하지 않는 ID입니다.");
    } else {
        alert("아이디가 확인되었습니다.");
    }
});


document.getElementById("subtn").addEventListener("click", function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
    var userId = document.getElementById("id").value; // 아이디 입력창의 값을 가져옵니다.
    if (userId === "root") {
        alert("이미 가입된 회원입니다."); // 'root'라는 아이디가 입력되었다면 경고창을 띄웁니다.
    } else {
        alert("파킹고의 회원이 되신 것을 진심으로 환영합니다.");
        // 홈화면으로 리디렉션
        window.location.href = 'index.html';
    }
});

