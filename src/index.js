import Navigo from 'navigo';

import styles from './styles.scss';
import homeHtml from './pages/home/home.html';

const el = (sel) => document.querySelector(sel);
const setContent = (id, content) => el('.js-content').innerHTML = content || el('#content-' + id).innerHTML;

const router = new Navigo();
router
    .on({
        '*': () => setContent('Home', homeHtml)
    })
    .resolve();
    
$.material.init();