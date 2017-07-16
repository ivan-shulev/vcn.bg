import homeHtml from './home.html';
import homeScss from './home.scss';
import projectsObject from './projects';

let homeObject, rendered, initialHTML;

function renderMustache(initialHtml, contentToRender, template) {
    Mustache.parse(initialHTML);   // optional, speeds up future uses
    rendered = Mustache.render(initialHTML, contentToRender);
    template.innerHTML = rendered;
}

document.addEventListener('DOMContentLoaded', function () {
    homeObject = document.getElementById('home');
    initialHTML = homeObject.innerHTML;
    renderMustache(initialHTML, {projects: projectsObject[language]}, homeObject)
});

document.addEventListener('changeLang', function(){
    renderMustache(initialHTML, {projects: projectsObject[language]}, homeObject)
});

module.exports = {
    homeHtml
};