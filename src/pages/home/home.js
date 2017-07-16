import homeHtml from './home.html';
import homeScss from './home.scss';
// import Mustache from 'mustache';

document.addEventListener('DOMContentLoaded', function () {
    var template = document.getElementById('template');
    Mustache.parse(template.innerHTML);   // optional, speeds up future uses
    var rendered = Mustache.render(template.innerHTML, {name: "Luke"});
    template.innerHTML = rendered;
});

module.exports = {
    homeHtml
};