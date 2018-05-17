import aboutHtml from './about.html';
import aboutScss from './about.scss';
import aboutTrans from './about-translations';
import setChangeLang from '../../utils/change-lang';
import renderMustache from '../../utils/render-mustache';

let aboutContainer, initialHTML;

const renderHtml = function () {
    renderMustache(initialHTML, { content: aboutTrans[language] }, aboutContainer);
    document.getElementById('iso-cert__link').setAttribute('href', 'assets/files/cert-' + language + '.pdf');
}

document.addEventListener('changeRoute', function (e) {
    if(e.detail !== 'about') {
        return;
    }
    aboutContainer = document.querySelector('.about');
    initialHTML = aboutContainer.innerHTML;
    renderHtml();
    setChangeLang(renderHtml, 'about');
});

module.exports = aboutHtml;