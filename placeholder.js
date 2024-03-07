const inputElement = document.getElementById("destinationInput");
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

