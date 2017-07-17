import homeHtml from './home.html';
import homeScss from './home.scss';
import projectsObject from './projects';

let homeObject, rendered, initialHTML, projectElements;
let currentActiveElementIndex = 0;
const projectActiveClass = 'project--displayed';
const projectHiddenLeft = 'project--hidden-to-left';
const projectHiddenRight = 'project--hidden-to-right';

function renderMustache(initialHtml, contentToRender, template) {
    Mustache.parse(initialHTML);   // optional, speeds up future uses
    rendered = Mustache.render(initialHTML, contentToRender);
    template.innerHTML = rendered;
}

function removeHiddenClasses(itemList) {
    itemList[currentActiveElementIndex].classList.remove(projectHiddenLeft, projectHiddenRight);
}

function addActiveClass(itemList) {
    removeHiddenClasses(itemList);
    itemList[currentActiveElementIndex].classList.add(projectActiveClass);
}

function hidePreviousActiveElement(itemList, currentActiveElementIndex, direction) {
    clearActiveClass(itemList, projectActiveClass);
    if(direction === 'previous') {
        itemList[currentActiveElementIndex].classList.add(projectHiddenRight);
    }
    else {
        itemList[currentActiveElementIndex].classList.add(projectHiddenLeft);
    }
}

function changeActiveElement(itemList, direction) {
    let projectItemsLength = itemList.length;
    if(direction === 'previous') {
        if(currentActiveElementIndex === 0) {
            currentActiveElementIndex = projectItemsLength-1;
        }
        else {
            currentActiveElementIndex--;
        }
    }
    else if(direction === 'next') {
        if(currentActiveElementIndex === projectItemsLength-1) {
            currentActiveElementIndex = 0;
        }
        else {
            currentActiveElementIndex++;
        }
    }
    addActiveClass(itemList);
}

function clearActiveClass(itemList, classToRemove) {
    for(const item of itemList) {
        item.classList.remove(classToRemove);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    homeObject = document.getElementsByClassName('projects')[0];
    initialHTML = homeObject.innerHTML;
    renderMustache(initialHTML, {projects: projectsObject[language]}, homeObject);
    projectElements = document.getElementsByClassName('project');
    projectElements[0].classList.add(projectActiveClass);
    projectElements[0].classList.remove(projectHiddenRight);
    const projectNavButtons = document.getElementsByClassName('project-navigation')[0].children;
    for(const projectButton of projectNavButtons) {
        const direction = projectButton.getAttribute('data-direction');
        projectButton.addEventListener('click', function(){
            hidePreviousActiveElement(projectElements, currentActiveElementIndex, direction);
            changeActiveElement(projectElements, direction)
        });
    }
    
});

document.addEventListener('changeLang', function(){
    renderMustache(initialHTML, {projects: projectsObject[language]}, homeObject)
    addActiveClass(projectElements);
});

module.exports = {
    homeHtml
};