import Navigo from 'navigo';

import styles from './styles.scss';
import { homeHtml } from './pages/home/home';
import { loader, loaderHtml } from './components/loader/loader';
import { header, headerHtml } from './components/header/header';
import { contactHtml } from './components/contact/contact';
import { servicesHtml } from './pages/services/services';

const clEvent = new Event('changeLang');
const el = (sel) => document.querySelector(sel);
const setContent = (id, content) => el('.js-content').innerHTML = content || el('#content-' + id).innerHTML;
const bodyElement = el('body');
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

function dispatchRouteChangeEvent(detail) {
    const crEvent = new CustomEvent('changeRoute', {detail});
    document.dispatchEvent(crEvent);
}

function handleRouting() {
    const router = new Navigo();
    router
        .on({
            // 'about': () => setContent('About', aboutHtml),
            'services': () => setContent('Services', servicesHtml),
            'projects': () => {
                setContent('Home', homeHtml);
                dispatchRouteChangeEvent('home');      
            },
            '*': () => {
                setContent('Home', homeHtml);
                dispatchRouteChangeEvent('home');      
            }
        })
        .resolve();

    const navigoLinks = document.querySelectorAll('[data-navigo]');
    navigoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate(e.target.getAttribute('href'));
        })
    });
}

varw('language', 'english');

bodyElement.innerHTML = headerHtml + bodyElement.innerHTML;
bodyElement.innerHTML += loaderHtml;
bodyElement.innerHTML += contactHtml;

function isViewHeightBigger() {
    return window.innerHeight > window.innerWidth;
}

function handleScreenRatio() {
    const biggerHeightClass = 'bigger-height';
    const biggerWidthClass = 'bigger-width';
    if(isViewHeightBigger()) {
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
});

window.onresize = function() {
    handleScreenRatio();
}

// Borrowed from https://stackoverflow.com/a/18633915/5396280
// I am doing this, because if a user closes the modal, scrolls down and
// refreshes, the page will reload and scroll to the previous position,
// showing the modal up top and only a small part of it visible.
window.onbeforeunload = function() {
    window.scroll(0, 0);
    bodyElement.classList.add('hidden');
}