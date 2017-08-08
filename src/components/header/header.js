import headerHtml from './header.html';
import navScss from './header.scss';

const bodyElement = document.querySelector('body');

document.addEventListener('DOMContentLoaded', function () {
    const langChangeButtons = document.querySelector('.langChange');
    for (const button of langChangeButtons.children) {
        const languageAttrValue = button.getAttribute('data-language');
        button.addEventListener('click', function () {
            if (languageAttrValue !== language) {
                language = languageAttrValue;
            }
        });
    }
    const contactToggle = document.querySelector('.contact-toggle');
    contactToggle.addEventListener('click', function(){
        const contactModal = document.querySelector('.banner-contact');
        bodyElement.classList.add('modal--open');
        bodyElement.classList.remove('menu--open');
        contactModal.classList.remove('banner--hidden');
        contactModal.classList.remove('closed');
    });
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', function () {
        bodyElement.classList.toggle('menu--open');
    });
});

module.exports = {
    headerHtml
};