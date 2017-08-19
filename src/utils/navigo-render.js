import clickEvent from './click-event-setter';

let _router;
const bodyElement = document.querySelector('body');

function renderNavigoLinks() {
    const navigoLinks = Array.from(document.querySelectorAll('[data-navigo]'));
    navigoLinks.forEach(link => {
        link.addEventListener(clickEvent, (e) => {
            e.preventDefault();
            bodyElement.classList.remove('menu--open');
            _router.navigate(e.target.getAttribute('href'));
        })
    });
}

function navigoReRender() {
    renderNavigoLinks();
}

function initialNavigoRender(router) {
    _router = router;
    renderNavigoLinks();
}

module.exports = {
    initialNavigoRender,
    navigoReRender
};