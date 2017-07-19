import Navigo from 'navigo';

import styles from './styles.scss';
import { homeHtml } from './pages/home/home';
import { loader, loaderHtml } from './components/loader/loader';
import { navigation, navigationHtml } from './components/navigation/navigation';
// import { aboutHtml } from './pages/about/about';

const event = new Event('changeLang');
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
                document.dispatchEvent(event);
            }
        });
    };
})(window);
const router = new Navigo();
router
    .on({
        'about': () => setContent('About', aboutHtml),
        '*': () => setContent('Home', homeHtml)
    })
    .resolve();

varw('language', 'english');

bodyElement.innerHTML += loaderHtml;
el('header').innerHTML = navigationHtml;

// Borrowed from https://stackoverflow.com/a/18633915/5396280
// I am doing this, because if a user closes the modal, scrolls down and
// refreshes, the page will reload and scroll to the previous position,
// showing the modal up top and only a small part of it visible.
window.onbeforeunload = function() {
    window.scroll(0, 0);
    bodyElement.classList.add('hidden');
}