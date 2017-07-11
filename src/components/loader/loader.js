import loaderHtml from './loader.html';
import loaderScss from './loader.scss';

let initialX, initialY, slider;
const touchMoveClass = 'initial-loader--touch-move';

function handleMove(ev) {
    const pixelsMoved = ev.changedTouches[0].pageY - initialY;
    if (pixelsMoved > 0) {
        return;
    }
    slider.style['margin-top'] = pixelsMoved + 'px';
}

function handleStart(ev) {
    slider.classList.add(touchMoveClass);
    initialX = ev.changedTouches[0].pageX;
    initialY = ev.changedTouches[0].pageY;
}

function handleEnd(ev) {
    slider.classList.remove(touchMoveClass);
    slider.style['margin-top'] = null;
    if (slider.clientHeight / 2 < (initialY - ev.changedTouches[0].pageY)) {
        handleCloseModal(slider);
    }
}

function handleCloseModal(parent) {
    parent.classList.add('closed');
    document.getElementsByTagName('body')[0].classList.remove('modal--open');
    window.scroll(0, 0);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementsByTagName('body')[0].classList.add('modal--open');
    const arrowButton = document.getElementsByClassName('initial-loader__arrow-button')[0];
    arrowButton.addEventListener('click', function (ev) {
        handleCloseModal(arrowButton.parentElement);
    });


    slider = document.getElementsByClassName('initial-loader')[0];
    slider.addEventListener('touchstart', handleStart, false);
    slider.addEventListener('touchend', handleEnd, false);
    slider.addEventListener('touchcancel', handleEnd, false);
    slider.addEventListener('touchmove', handleMove, false);
});

module.exports = {
    loaderHtml
};