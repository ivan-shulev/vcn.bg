import homeHtml from './home.html';
import homeScss from './home.scss';
import homeTrans from './home-translations';
import renderMustache from '../../utils/render-mustache';
import setChangeLang from '../../utils/change-lang';

let homeObject, rendered, initialHTML, projectElements, initialX, direction;
let currentActiveElementIndex = 0;
const touchMoveClass = 'project--touch-move';
const projectActiveClass = 'project--displayed';
const projectHiddenLeft = 'project--hidden-to-left';
const projectHiddenRight = 'project--hidden-to-right';
const right = 'right';
const left = 'left';

function removeHiddenClasses(itemList) {
    itemList[currentActiveElementIndex].classList.remove(projectHiddenLeft, projectHiddenRight);
}

function addActiveClass() {
    removeHiddenClasses(projectElements);
    projectElements[currentActiveElementIndex].classList.add(projectActiveClass);
}

function hidePreviousActiveElement(itemList, currentActiveElementIndex, direction) {
    clearClassFromAll(itemList, projectActiveClass);
    if (direction === right) {
        itemList[currentActiveElementIndex].classList.add(projectHiddenRight);
    }
    else {
        itemList[currentActiveElementIndex].classList.add(projectHiddenLeft);
    }
}

function changeActiveElement() {
    if (direction === left) {
        currentActiveElementIndex++;
    }
    else if (direction === right) {
        currentActiveElementIndex--;
    }
    addActiveClass();
}

function clearClassFromAll(itemList, classToRemove) {
    itemList.array.forEach((item) => item.classList.remove(classToRemove));
}

function handleStart(ev) {
    ev.currentTarget.classList.add(touchMoveClass);
    initialX = ev.changedTouches[0].pageX;
}

function handleMove(ev) {
    const pixelsMoved = ev.changedTouches[0].pageX - initialX;
    direction = pixelsMoved > 0 ? right : left;

    if (isLeft() && !isLast()) {
        const nextElement = projectElements[currentActiveElementIndex + 1];
        nextElement.classList.add(touchMoveClass);
        nextElement.style['margin-left'] += pixelsMoved + 40 + 'px';
    }
    else if (isRight() && !isFirst()) {
        const previousElement = projectElements[currentActiveElementIndex - 1];
        const windowWidth = window.innerWidth;
        previousElement.classList.add(touchMoveClass);
        previousElement.style['margin-left'] = pixelsMoved - windowWidth + 'px';
        // The setting of the previous margin-left is enough
        return;
    }
    ev.currentTarget.style['margin-left'] = pixelsMoved + 'px';
}

function isLeft() {
    return direction === left;
}

function isRight() {
    return direction === right;
}

function isLast() {
    return currentActiveElementIndex + 1 === projectElements.length;
}

function isFirst() {
    return currentActiveElementIndex === 0;
}

function handleEnd(ev) {
    const element = ev.currentTarget;
    element.classList.remove(touchMoveClass);
    element.style['margin-left'] = null;
    if(isLeft() && !isLast()) {
        const nextElement = projectElements[currentActiveElementIndex + 1];
        nextElement.classList.remove(touchMoveClass);
        nextElement.style['margin-left'] = null;
    }
    else if (isRight() && !isFirst()) {
        const previousElement = projectElements[currentActiveElementIndex - 1];
        previousElement.classList.remove(touchMoveClass);
        previousElement.style['margin-left'] = null;
    }
    // Swiped to left
    if (element.clientWidth / 2 < (initialX - ev.changedTouches[0].pageX)) {
        if (isLast()) {
            return;
        }
        changeActive();
    }
    // Swiped to right
    else if (element.clientWidth / 2 < (ev.changedTouches[0].pageX - initialX)) {
        if (isFirst()) {
            return;
        }
        changeActive();
    }
}

function changeActive() {
    hidePreviousActiveElement(projectElements, currentActiveElementIndex, direction);
    changeActiveElement(projectElements, direction)
}

function renderHtml(){
    renderMustache(initialHTML, { content: homeTrans[language] }, homeObject);
}

document.addEventListener('changeRoute', function (e) {
    if(e.detail !== 'home') {
        return;
    }
    setChangeLang(changeLang, 'home');
    homeObject = document.querySelector('#home');
    initialHTML = homeObject.innerHTML;
    projectElements = document.getElementsByClassName('project');
    renderHtml();
    // projectElements[0].classList.add(projectActiveClass);
    // projectElements[0].classList.remove(projectHiddenRight);

    // Slide left-to-right-and-back code
    // for (const project of projectElements) {
    //     project.addEventListener('touchstart', handleStart, false);
    //     project.addEventListener('touchend', handleEnd, false);
    //     project.addEventListener('touchcancel', handleEnd, false);
    //     project.addEventListener('touchmove', handleMove, false);
    // }
});

const changeLang = function () {
    renderHtml();
    // addActiveClass();
}

export default homeHtml;
