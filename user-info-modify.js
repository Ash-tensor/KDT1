// 로컬저장소에 디폴트 닉네임(홍길동) 저장
localStorage.setItem('defaultNickname', "홍길동");

// 개인 정보 수정 페이지의 변경 버튼 누름
document.getElementById("user_info_modify_button")?.addEventListener("click", function() {
    // 닉네임 변경 input 값 가져옴
    var changedUserNickname = document.getElementById('changed_user_nickname').value;
    // 로컬 스토리지에 변경된 닉네임 값 저장
    localStorage.setItem('changedUserNickname', changedUserNickname);
    // 변경 완료 알림창
    alert("변경 사항이 성공적으로 적용되었습니다.");
    // 페이지를 새로고침하여 변경 사항 반영
    location.reload();
});

window.addEventListener('load', function() {
    // 로컬 스토리지에서 변경된 닉네임을 불러옴
    var changedUserNickname = localStorage.getItem('changedUserNickname');
    // 닉네임이 표시되는 html 요소
    var userNickname = document.getElementById('user_nickname');

    // 변경된 닉네임이 존재할 경우 마이페이지에 반영
    if (changedUserNickname) {
        // 변경된 닉네임을 html 요소에 적용
        userNickname.innerHTML = changedUserNickname + ' <button class="logout" id="logoutButton"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>';
    } else {
        // 로컬 스토리지에서 디폴트 닉네임을 불러옴
        var defaultNickname = localStorage.getItem('defaultNickname');
        // 변경된 닉네임이 없으면 디폴트 닉네임(홍길동)이 표시됨
        userNickname.innerHTML =  defaultNickname + ' <button class="logout" id="logoutButton"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>';
    }

    // 변경된 닉네임 옆 로그아웃 버튼의 이벤트리스너 새로 추가
    document.getElementById("logoutButton")?.addEventListener("click", function() {
        console.log("test");
        signIn = false;
        sessionStorage.setItem("signIn", "false");
        offCanvasLoad();
    });

    setTimeout(function() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('id8a7fe3873ef63').style.display = 'block';
    }, 1500);
});

// --------------------------------------------------------------------------------------------- //
// ************ 이 밑으로는 사이드바 관련 js입니다 **************** ///

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
