import headerHtml from './header.html';
import navScss from './header.scss';
import linkTranslations from './menu-translations';
import setChangeLang from '../../utils/change-lang';
import renderMustache from '../../utils/render-mustache';
import clickEvent from '../../utils/click-event-setter';

let mainNavContainers, initialHTML = [], hamburger;
const bodyElement = document.querySelector('body');
const hiddenClass = 'hidden';

function closeMenu() {
    bodyElement.classList.remove('menu--open');
    document.removeEventListener(clickEvent, documentClick);
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
    document.addEventListener(clickEvent, documentClick);
}

const renderHtml = function () {
    initialHTML.forEach((html, index) => {
        renderMustache(html, { links: linkTranslations[language] }, mainNavContainers[index]);
    });
}

function showActiveLangButton(buttons) {
    buttons.forEach((button) => {
        const languageAttrValue = button.getAttribute('data-language');
        if(languageAttrValue !== language) {
            button.classList.remove(hiddenClass);
        }
    });
}

document.addEventListener('changeLang', renderHtml);

document.addEventListener('DOMContentLoaded', function () {
    mainNavContainers = document.querySelectorAll('[data-main-navigation-links]');
    Array.from(mainNavContainers).forEach((html) => initialHTML.push(html.innerHTML));
    renderHtml();
    const langChangeButtons = Array.from(document.querySelector('.lang-change-buttons').children);
    langChangeButtons.forEach((button) => {
        const languageAttrValue = button.getAttribute('data-language');
        if(languageAttrValue !== language) {
            button.classList.remove(hiddenClass);
        }
        button.addEventListener(clickEvent, function () {
            if (languageAttrValue !== language) {
                language = languageAttrValue;
                button.classList.add(hiddenClass);
                showActiveLangButton(langChangeButtons);
            }
        });
    });
    
    const mainContentContainer = document.querySelector('.js-content');
    hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener(clickEvent, function () {
        bodyElement.classList.toggle('menu--open');
        addClickToClose();
    });
});

module.exports = headerHtml;