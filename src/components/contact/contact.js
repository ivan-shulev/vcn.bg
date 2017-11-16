import renderMustache from '../../utils/render-mustache';
import setChangeLang from '../../utils/change-lang';
import contactHtml from './contact.html';
import './contact.scss';
import clickEvent from '../../utils/click-event-setter';
import pin from './vcn-pin.png';
import contactTranslations from './contact-translations';

let gmapsScriptPresent = false;
let contactContainer, initialHTML;

const renderHtml = function () {
    renderMustache(initialHTML, { content: contactTranslations[language] }, contactContainer);
}

// Need to make initMap globally available, for the maps callback
window.initMap = function() {
    const info =
        '<h4>VCN office</h4><p>бул. "Шипченски проход" 63, офис 106</p>';
    const vcnOfficeLocation = { lat: 42.679069, lng: 23.367509 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: vcnOfficeLocation
    });
    const infowindow = new google.maps.InfoWindow({
        content: info
    });
    const marker = new google.maps.Marker({
        position: vcnOfficeLocation,
        map: map,
        icon: pin
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
};

function appendScriptToDom(src) {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    document.body.appendChild(script);
}

document.addEventListener('changeRoute', function(e) {
    if (e.detail !== 'contact') {
        return;
    }
    if (gmapsScriptPresent) {
        initMap();
    } else {
        gmapsScriptPresent = true;
        appendScriptToDom(
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyBy7Zpp8CMm-i_HKcb7XavqFF41xizjlz0&callback=initMap'
        );
    }
    contactContainer = document.querySelector('.contact-info');
    initialHTML = contactContainer.innerHTML;
    renderHtml();
    setChangeLang(renderHtml, 'contact');
});

module.exports = contactHtml;
