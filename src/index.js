import Navigo from 'navigo';

import checkFlex from './utils/flex-check';
import clickEvent from './utils/click-event-setter';

import styles from './styles.scss';
import homeHtml from './pages/home/home';
import aboutHtml from './pages/about/about';
import servicesHtml from './pages/services/services';
import loaderHtml from './components/loader/loader';
import headerHtml from './components/header/header';
import contactHtml from './components/contact/contact';
import { initialNavigoRender } from './utils/navigo-render';

let router;
const clEvent = new Event('changeLang');
const el = (sel) => document.querySelector(sel);
const setContent = (id, content) => el('.js-content').innerHTML = content || el('#content-' + id).innerHTML;
const bodyElement = el('body');

function dispatchRouteChangeEvent(detail) {
    const crEvent = new CustomEvent('changeRoute', { detail });
    document.dispatchEvent(crEvent);
}

const varw = (function (context) {
    return function (varName, varValue) {
        let value = varValue;

        Object.defineProperty(context, varName, {
            get: function () { return value; },
            set: function (v) {
                value = v;
                document.dispatchEvent(clEvent);
            }
        });
    };
})(window);

function handleRouting() {
    router = new Navigo();
    router
        .on({
            'about': () => {
                setContent('About', aboutHtml);
                dispatchRouteChangeEvent('about');
            },
            'services': () => {
                setContent('Services', servicesHtml);
                dispatchRouteChangeEvent('services');
            },
            'projects': () => {
                setContent('Home', homeHtml);
                dispatchRouteChangeEvent('home');
            },
            'contact': () => {
                setContent('Contact', contactHtml);
                dispatchRouteChangeEvent('contact');
            },
            '*': () => {
                setContent('Home', homeHtml);
                dispatchRouteChangeEvent('home');
            }
        })
        .resolve();
}

varw('language', 'bulgarian');

bodyElement.innerHTML = headerHtml + bodyElement.innerHTML;
bodyElement.innerHTML += loaderHtml;

function isViewHeightBigger() {
    return window.innerHeight > window.innerWidth;
}

function handleScreenRatio() {
    const biggerHeightClass = 'bigger-height';
    const biggerWidthClass = 'bigger-width';
    if (isViewHeightBigger()) {
        bodyElement.classList.remove(biggerWidthClass);
        bodyElement.classList.add(biggerHeightClass);
    }
    else {
        bodyElement.classList.remove(biggerHeightClass);
        bodyElement.classList.add(biggerWidthClass);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    bodyElement.classList.remove('loading-content');
    handleRouting();
    handleScreenRatio();
    initialNavigoRender(router);
});

window.onresize = function () {
    handleScreenRatio();
}

// Borrowed from https://stackoverflow.com/a/18633915/5396280
// I am doing this, because if a user closes the modal, scrolls down and
// refreshes, the page will reload and scroll to the previous position,
// showing the modal up top and only a small part of it visible.
window.onbeforeunload = function () {
    window.scroll(0, 0);
    bodyElement.classList.add('hidden');
}