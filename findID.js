$('#verification-method').on('change', function() {
    var method = $(this).val();

    if (method === 'phone') {
        $('#phone-verification').show();
        $('#email-verification').hide();
    } else if (method === 'email') {
        $('#email-verification').show();
        $('#phone-verification').hide();
    } else {
        $('#phone-verification, #email-verification').hide();
    }
});
