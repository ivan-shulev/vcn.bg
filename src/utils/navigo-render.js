import clickEvent from './click-event-setter';

let _router;
const bodyElement = document.querySelector('body');

function renderNavigoLinks() {
    const navigoLinkHolders = document.querySelectorAll('[data-main-navigation-links]');
    Array.from(navigoLinkHolders).forEach(holder => {
        holder.addEventListener(clickEvent, e => {
            if(e.target.tagName !== 'A') {
                return;
            }
            e.preventDefault();
            bodyElement.classList.remove('menu--open');
            _router.navigate(e.target.getAttribute('href'));
        });
    })
}

export function navigoReRender() {
    renderNavigoLinks();
}

export function initialNavigoRender(router) {
    _router = router;
    renderNavigoLinks();
}