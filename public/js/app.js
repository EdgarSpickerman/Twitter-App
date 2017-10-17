//form events
$('form').keyup(function (e) {
    let max = $(this).find('.tweet-textArea').prop('maxlength')
    let charTaken = $(this).find('.tweet-textArea').val().length;
    $(this).find('.app--tweet--char').html(max - charTaken);
});

$('form').submit(function (e) {
    e.preventDefault();
});