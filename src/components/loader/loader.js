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
        slider.classList.add('closed');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const arrowButton = document.getElementsByClassName('initial-loader__arrow-button')[0];
    arrowButton.addEventListener('click', function (ev) {
        arrowButton.parentElement.classList.add('closed');
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