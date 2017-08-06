import servicesHtml from './services.html';
import servicesScss from './services.scss';
import servicesObject from './services-object';
import setChangeLang from '../../utils/change-lang';

const changeLang = function () {
    console.log('services ChangeLang');
}

document.addEventListener('changeRoute', function (e) {
    if(e.detail !== 'services') {
        return;
    }
    setChangeLang(changeLang, 'services');
});

module.exports = {
    servicesHtml
};