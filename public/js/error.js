document.querySelector('.stack').style.display = 'none'

document.querySelector('a').addEventListener('click', () => {
    if (document.querySelector('.stack').style.display === 'block') {
        document.querySelector('.stack').style.display = 'none'
    } else {
        document.querySelector('.stack').style.display='block';
    }
});
