//selects an element with class stack and hides it (this is the long nasty error message)
document.querySelector('.stack').style.display = 'none'


//toggle effect that we see on the error page
document.querySelector('a').addEventListener('click', () => {
    if (document.querySelector('.stack').style.display === 'block') {
        document.querySelector('.stack').style.display = 'none'
    } else {
        document.querySelector('.stack').style.display='block';
    }
});
