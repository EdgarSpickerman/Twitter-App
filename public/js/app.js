//form events
$('form').keyup(function (e) {
    $(this).find('p').remove();
    let max = $(this).find('#tweet-textarea').prop('maxlength')
    let charTaken = $(this).find('#tweet-textarea').val().length;
    $(this).find('.app--tweet--char').html(max - charTaken);
});

//describes what we are going to do with the response from the express server
const tweetUpdate = data => {
    if (data.statusCode) {
        $('#tweet-textarea').val('');
        return $('form').append('<p style= "margin: 0 auto;text-align: center;" >' + data.message + '</p>')
    }
    let $oldTweet = $('.app--tweet--list').children().first('li').prop('outerHTML');
    $('.app--tweet--list').prepend($oldTweet)
    $newTweet=$('.app--tweet--list').children().first('li');
    $('#tweet-textarea').val('');
    $newTweet.find('.app--tweet--timestamp').html(data.date)
    let avatar = $newTweet.find('.app--avatar').css({'background-image':'url('+data.picture+')'})
    $newTweet.find('.app--tweet--author').html(avatar).append(data.author);
    $newTweet.find('p').html(data.message);
    $newTweet.find('.app--retweet').find('strong').html(data.retweet)
    $newTweet.find('.app--like').find('strong').html(data.like);
}


//makes a post ajax request to the server
$('form').submit(function (e) {
    e.preventDefault();
    let $thisForm = $(this);
    $.post($thisForm.attr('action'), $thisForm.serialize(), tweetUpdate, 'json');
});