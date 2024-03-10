document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('input[name="verificationMethod"]').forEach(function(elem) {
        elem.addEventListener("change", function() {
            var value = this.value;
            if (value === "email") {
                document.getElementById("emailVerificationContent").style.display = "block";
            } else {
                document.getElementById("emailVerificationContent").style.display = "none";
            }
        });
    });
});
