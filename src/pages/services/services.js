import servicesHtml from './services.html';
import servicesScss from './services.scss';
import servicesObject from './services-object';
import setChangeLang from '../../utils/change-lang';
import renderMustache from '../../utils/render-mustache';

let servicesContainer, initialHTML;

const renderHtml = function () {
    renderMustache(initialHTML, { content: servicesObject[language] }, servicesContainer);
}

document.addEventListener('changeRoute', function (e) {
    if(e.detail !== 'services') {
        return;
    }
    servicesContainer = document.querySelector('[data-content-services]');
    initialHTML = servicesContainer.innerHTML;
    renderHtml();
    setChangeLang(renderHtml, 'services');
});

module.exports = servicesHtml;