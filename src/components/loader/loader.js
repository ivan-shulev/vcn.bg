import loaderHtml from './loader.html';
import loaderScss from './loader.scss';
import clickEvent from '../../utils/click-event-setter';

let initialX, initialY, slider;
const touchMoveClass = 'initial-loader--touch-move';

function handleMove(ev) {
    const pixelsMoved = ev.changedTouches[0].pageY - initialY;
    if (pixelsMoved > 0) {
        return;
    }
    slider.style['transform'] = 'translate(0, ' + pixelsMoved + 'px)';
}

function handleStart(ev) {
    slider.classList.add(touchMoveClass);
    initialX = ev.changedTouches[0].pageX;
    initialY = ev.changedTouches[0].pageY;
}

function handleEnd(ev) {
    slider.classList.remove(touchMoveClass);
    slider.style['transform'] = null;
    if (slider.clientHeight / 3 < (initialY - ev.changedTouches[0].pageY)) {
        handleCloseModal(slider);
    }
}

function handleCloseModal(parent) {
    parent.classList.add('closed');
    document.querySelector('body').classList.remove('modal--open');
    window.scroll(0, 0);
    parent.addEventListener('transitionend', function (event) {
        parent.classList.add('hidden');
    }, false);
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('modal--open');
    const arrowButton = document.querySelector('.initial-loader__arrow-button');
    arrowButton.addEventListener(clickEvent, function (ev) {
        handleCloseModal(arrowButton.parentElement);
    });


    slider = document.querySelector('.initial-loader');
    slider.addEventListener('touchstart', handleStart, false);
    slider.addEventListener('touchend', handleEnd, false);
    slider.addEventListener('touchcancel', handleEnd, false);
    slider.addEventListener('touchmove', handleMove, false);
});

export default loaderHtml;