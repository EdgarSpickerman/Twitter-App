//form events
$('form').keyup(function (e) {
    $(this).find('p').remove();
    let max = $(this).find('#tweet-textarea').prop('maxlength')
    let charTaken = $(this).find('#tweet-textarea').val().length;
    $(this).find('.app--tweet--char').html(max - charTaken);
});

const tweetUpdate = data => {
    if (data.statusCode) {
        $('#tweet-textarea').val('');
        return $('form').append('<p style= "margin: 0 auto;text-align: center;" >' + data.message + '</p>')
    }
    let $oldTweet = $('.app--tweet--list').children().last();
    $oldTweet.find('.app--tweet--timestamp').html(data.date)
    let avatar = $oldTweet.find('.app--avatar').css({'background-image':'url('+data.picture+')'})
    $oldTweet.find('.app--tweet--author').html(avatar).append(data.author);
    $oldTweet.find('p').html(data.message);
    $oldTweet.find('.app--retweet').find('strong').html(data.retweet)
    $oldTweet.find('.app--like').find('strong').html(data.like);
    let newTweet = $oldTweet.prop('outerHTML');
    $oldTweet.remove()
    $('.app--tweet--list').children().first().before(newTweet);
    $('#tweet-textarea').val('');
}

$('form').submit(function (e) {
    e.preventDefault();
    let $thisForm = $(this);
    $.post($thisForm.attr('action'), $thisForm.serialize(), tweetUpdate, 'json');
});