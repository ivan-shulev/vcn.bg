import headerHtml from './header.html';
import navScss from './header.scss';
import linkTranslations from './menu-translations';
import setChangeLang from '../../utils/change-lang';
import renderMustache from '../../utils/render-mustache';

let mainNavContainer, initialHTML;
const bodyElement = document.querySelector('body');
const hiddenClass = 'hidden';

function closeMenu() {
    bodyElement.classList.remove('menu--open');
}

const renderHtml = function () {
    renderMustache(initialHTML, { links: linkTranslations[language] }, mainNavContainer);
    attachContactToggleToButton();
}

function showActiveLangButton(buttons) {
    for (let button of buttons) {
        const languageAttrValue = button.getAttribute('data-language');
        if(languageAttrValue !== language) {
            button.classList.remove(hiddenClass);
        }
    }
}

function attachContactToggleToButton() {
    const contactToggle = document.querySelector('.contact-toggle');
    contactToggle.addEventListener('click', function(){
        const contactModal = document.querySelector('.banner-contact');
        bodyElement.classList.add('modal--open');
        contactModal.classList.remove('banner--hidden');
        contactModal.classList.remove('closed');
        closeMenu();
    });
}

document.addEventListener('changeLang', renderHtml);

document.addEventListener('DOMContentLoaded', function () {
    mainNavContainer = document.querySelector('[data-main-navigation-links]');
    initialHTML = mainNavContainer.innerHTML;
    renderHtml();
    const langChangeButtons = document.querySelector('.lang-change-buttons').children;
    for (let button of langChangeButtons) {
        const languageAttrValue = button.getAttribute('data-language');
        if(languageAttrValue !== language) {
            button.classList.remove(hiddenClass);
        }
        button.addEventListener('click', function () {
            if (languageAttrValue !== language) {
                language = languageAttrValue;
                button.classList.add(hiddenClass);
                showActiveLangButton(langChangeButtons);
            }
        });
    }
    
    const hamburger = document.querySelector('.hamburger');
    const mainContentContainer = document.querySelector('.js-content');
    hamburger.addEventListener('click', function () {
        bodyElement.classList.toggle('menu--open');
        mainContentContainer.classList.add('--to-right');
    });
    mainContentContainer.addEventListener('transitionend', (e) => {
        if(!bodyElement.classList.contains('menu--open')) {
            mainContentContainer.classList.remove('--to-right');
        }
    });
});

module.exports = headerHtml;