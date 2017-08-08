import headerHtml from './header.html';
import navScss from './header.scss';
import linkTranslations from './menu-translations';
import setChangeLang from '../../utils/change-lang';
import renderMustache from '../../utils/render-mustache';

let mainNavContainer, initialHTML;
const bodyElement = document.querySelector('body');

function closeMenu() {
    bodyElement.classList.remove('menu--open');
}

const renderHtml = function () {
    renderMustache(initialHTML, { links: linkTranslations[language] }, mainNavContainer);
}

document.addEventListener('changeLang', renderHtml);

document.addEventListener('DOMContentLoaded', function () {
    mainNavContainer = document.querySelector('[data-main-navigation-links]');
    initialHTML = mainNavContainer.innerHTML;
    renderHtml();
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