import Navigo from 'navigo';

import styles from './styles.scss';
import { homeHtml } from './pages/home/home';
import { loader, loaderHtml } from './components/loader/loader';
// import { aboutHtml } from './pages/about/about';

const el = (sel) => document.querySelector(sel);
const setContent = (id, content) => el('.js-content').innerHTML = content || el('#content-' + id).innerHTML;
const varw = (function (context) {
    return function (varName, varValue) {
        var value = varValue;

        Object.defineProperty(context, varName, {
            get: function () { return value; },
            set: function (v) {
                value = v;
                console.log('Value changed! New value: ' + value);
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

el('.js-content').innerHTML += loaderHtml;