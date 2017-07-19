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
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', function () {
        bodyElement.classList.toggle('menu--open');
    });
});

module.exports = {
    headerHtml
};