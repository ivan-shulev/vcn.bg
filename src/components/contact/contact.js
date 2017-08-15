import contactHtml from './contact.html';
import './contact.scss';


document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.banner-contact__close-button');
    closeButton.addEventListener('click', function () {
        const parent = closeButton.parentNode;
        document.querySelector('body').classList.remove('modal--open');
        parent.classList.add('closed');
        parent.addEventListener('transitionend', function (event) {
            if(parent.classList.contains('closed')) {
                parent.classList.add('banner--hidden');
            }
        }, false);
    });
    const linkButtons = Array.from(document.querySelectorAll('.banner-contact__info-link'));
    linkButtons.forEach((link) => link.addEventListener('click', (e) => e.preventDefault()));
});

module.exports = contactHtml;