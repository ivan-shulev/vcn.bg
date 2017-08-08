import headerHtml from './header.html';
import navScss from './header.scss';

const bodyElement = document.querySelector('body');

function closeMenu() {
    bodyElement.classList.remove('menu--open');
}

document.addEventListener('DOMContentLoaded', function () {
    const langChangeButtons = document.querySelector('.langChange');
    for (const button of langChangeButtons.children) {
        const languageAttrValue = button.getAttribute('data-language');
        button.addEventListener('click', function () {
            if (languageAttrValue !== language) {
                language = languageAttrValue;
                closeMenu();
            }
        });
    }
    const contactToggle = document.querySelector('.contact-toggle');
    contactToggle.addEventListener('click', function(){
        const contactModal = document.querySelector('.banner-contact');
        bodyElement.classList.add('modal--open');
        contactModal.classList.remove('banner--hidden');
        contactModal.classList.remove('closed');
        closeMenu();
    });
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', function () {
        bodyElement.classList.toggle('menu--open');
    });
});

module.exports = {
    headerHtml
};