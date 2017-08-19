import headerHtml from './header.html';
import navScss from './header.scss';
import linkTranslations from './menu-translations';
import setChangeLang from '../../utils/change-lang';
import renderMustache from '../../utils/render-mustache';

let mainNavContainer, initialHTML, hamburger;
const bodyElement = document.querySelector('body');
const hiddenClass = 'hidden';

function closeMenu() {
    bodyElement.classList.remove('menu--open');
    document.removeEventListener('click', documentClick);
}

function getParentElements(element) {
    const parentsArray = [];
    while(element) {
        parentsArray.push(element);
        element = element.parentElement;
    }
    return parentsArray;
}

function documentClick(e) {
    if(!bodyElement.classList.contains('menu--open') || getParentElements(e.target).reverse().includes(hamburger)) {
        return;
    }
    closeMenu();
}

function addClickToClose() {
    document.addEventListener('click', documentClick);
}

const renderHtml = function () {
    renderMustache(initialHTML, { links: linkTranslations[language] }, mainNavContainer);
    attachContactToggleToButton();
}

function showActiveLangButton(buttons) {
    buttons.forEach((button) => {
        const languageAttrValue = button.getAttribute('data-language');
        if(languageAttrValue !== language) {
            button.classList.remove(hiddenClass);
        }
    });
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
    const langChangeButtons = Array.from(document.querySelector('.lang-change-buttons').children);
    langChangeButtons.forEach((button) => {
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
    });
    
    const mainContentContainer = document.querySelector('.js-content');
    hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', function () {
        bodyElement.classList.toggle('menu--open');
        mainContentContainer.classList.add('--to-right');
        addClickToClose();
    });
    mainContentContainer.addEventListener('transitionend', (e) => {
        if(!bodyElement.classList.contains('menu--open')) {
            mainContentContainer.classList.remove('--to-right');
        }
    });
});

module.exports = headerHtml;