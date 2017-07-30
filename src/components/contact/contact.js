import contactHtml from './contact.html';
import './contact.scss';

document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.banner-contact__close-button');
    closeButton.addEventListener('click', function(){
        document.querySelector('body').classList.remove('modal--open');
        closeButton.parentNode.classList.add('closed');
    });
});

module.exports = {
    contactHtml
};