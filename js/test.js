const button = document.querySelector('.loginBtn');
const email = document.querySelector('.mailLogin');
const password = document.querySelector('.passwordLogin');

button.onclick = function() {
    if ( (email.value == 'admin') && (password.value == 'admin') ) {
        document.location.href='dashBoardMainPage.html';
    }
};

password.addEventListener('keydown', function(event) {
    if ( (email.value == 'admin') && (password.value == 'admin') && (event.key == "Enter") ) {
        document.location.href='dashBoardMainPage.html';
    }
});
