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
    const infoWarehouse = '<h4>VCN warehouse</h4><p>бул. "Шипченски проход" 63</p>';
    const infoOffice = '<h4>VCN Office</h4><p>бул. "Шипченски проход" 63, ет. 10, офис 106</p>';
    const vcnWarehouseLocation = { lat: 42.678762, lng: 23.367724 };
    const vcnOfficeLocation = { lat: 42.678533, lng: 23.366522 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: vcnWarehouseLocation
    });
    const infoWarehouseWindow = new google.maps.InfoWindow({
        content: infoWarehouse
    });
    const infoOfficeWindow = new google.maps.InfoWindow({
        content: infoOffice
    });
    const marker = new google.maps.Marker({
        position: vcnWarehouseLocation,
        map: map,
        icon: pin
    });
    marker.addListener('click', function() {
        infoWarehouseWindow.open(map, marker);
    });
    const marker2 = new google.maps.Marker({
        position: vcnOfficeLocation,
        map: map,
        icon: pin
    });
    marker2.addListener('click', function() {
        infoOfficeWindow.open(map, marker2);
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

export default contactHtml;
