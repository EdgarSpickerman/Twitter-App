//form events
$('form').keyup(function (e) {
    let max = $(this).find('#tweet-textarea').prop('maxlength')
    let charTaken = $(this).find('#tweet-textarea').val().length;
    $(this).find('.app--tweet--char').html(max - charTaken);
});

$('form').submit(function (e) {
    e.preventDefault();
    $.post($(this).attr('action'), $this.serialize(), tweetUpdate, 'json');
});