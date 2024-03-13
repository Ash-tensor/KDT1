
// let searchResults = [];//주차장 검색 결과를 저장할 배열
// let alarmParkingInfo = []; // 관심 주차장의 정보를 저장하는 배열

function parkingInfoDuplicateCheck(parkingObj) {
    for (let i = 0; i < alarmParkingInfo.length; i++) {
        if (alarmParkingInfo[i].name === parkingObj.name &&
            alarmParkingInfo[i].address === parkingObj.address) {
            return true; // 중복이면 true 반환
        }
    }
    return false; // 중복이 아니면 false 반환
}

// 알람 정보를 로컬 스토리지에 저장하는 함수
function saveAlarmInfoToLocalStorage(alarmInfo) {
    localStorage.setItem('alarmInfo', JSON.stringify(alarmInfo));
}

// 로컬 스토리지에서 알람 정보를 가져오는 함수
function getAlarmInfoFromLocalStorage() {
    let data = localStorage.getItem('alarmInfo');
    return data ? JSON.parse(data) : [];
}

function alarmButtonClicked() {
    var alarmButton = document.getElementById('alarm-button');
    var alarmInfo = getAlarmInfoFromLocalStorage();

    // 현재 주차장 정보를 가져옴
    var currentParking = {
        name: searchResults[currentIndex][0],
        address: searchResults[currentIndex][2],
        // 필요한 경우 추가 정보를 여기에 추가
    };

    if (alarmButton.classList.contains('btn-outline-primary')) {
        // 알람 버튼이 눌려지면, 현재 주차장을 alarmInfo 배열에 추가
        alarmInfo.push(currentParking);
        alarmButton.classList.remove('btn-outline-primary');
        alarmButton.classList.add('btn-primary');

        setTimeout(function()
        {
            var toastElement = document.querySelector('.toast');
            var toast = new bootstrap.Toast(toastElement, {
                autohide: false,
                delay: 10000
            });
            toast.show();

            alarmButtonClicked();
            console.log('알람 설정 완료 메시지 출력')
        }, 2500); // 알람 설정 완료 메시지를 2.5초 뒤에 표시

    } else {
        // 알람 버튼이 해제되면, 현재 주차장을 alarmInfo 배열에서 제거
        alarmInfo = alarmInfo.filter(function(parking) {
            return parking.name !== currentParking.name || parking.address !== currentParking.address;
        });
        alarmButton.classList.remove('btn-primary');
        alarmButton.classList.add('btn-outline-primary');
    }

    // 변경된 alarmInfo 배열을 로컬 스토리지에 저장
    saveAlarmInfoToLocalStorage(alarmInfo);
}

function alarmButtonClicked2(index, buttonId) {
    var alarmButton = document.getElementById(buttonId);
    var alarmInfo = getAlarmInfoFromLocalStorage();

    // 선택된 주차장 정보를 가져옴
    var selectedParking = {
        name: searchResults[index][0],
        address: searchResults[index][2],
        // 필요한 경우 추가 정보를 여기에 추가
    };

    if (alarmButton.classList.contains('btn-outline-primary')) {
        // 알람 버튼이 눌려지면, 선택된 주차장을 alarmParkingInfo 배열에 추가
        alarmInfo.push(selectedParking);
        alarmButton.classList.remove('btn-outline-primary');
        alarmButton.classList.add('btn-primary');

        setTimeout(function()
        {
            var toastElement = document.querySelector('.toast');
            var toast = new bootstrap.Toast(toastElement, {
                autohide: false,
                delay: 10000
            });
            toast.show();
            console.log('알람 설정 완료 메시지 출력')

            alarmButtonClicked2(index, buttonId);

        }, 2500); // 알람 설정 완료 메시지를 2.5초 뒤에 표시

    } else {
        // 알람 버튼이 해제되면, 선택된 주차장을 alarmParkingInfo 배열에서 제거
        alarmInfo = alarmInfo.filter(function(parking) {
            return parking.name !== selectedParking.name || parking.address !== selectedParking.address;
        });
        alarmButton.classList.remove('btn-primary');
        alarmButton.classList.add('btn-outline-primary');
    }

    // 변경된 alarmParkingInfo 배열을 로컬 스토리지에 저장
    localStorage.setItem('alarmInfo', JSON.stringify(alarmInfo));
}