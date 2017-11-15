import contactHtml from './contact.html';
import './contact.scss';
import clickEvent from '../../utils/click-event-setter';

window.initMap = function() {
    var uluru = { lat: 42.679069, lng: 23.367509 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
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
    appendScriptToDom(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBy7Zpp8CMm-i_HKcb7XavqFF41xizjlz0&callback=initMap'
    );
});

document.addEventListener('DOMContentLoaded', function() {
    // const closeButton = document.querySelector('.banner-contact__close-button');
    // closeButton.addEventListener(clickEvent, function() {
    //     const parent = closeButton.parentNode;
    //     document.querySelector('body').classList.remove('modal--open');
    //     parent.classList.add('closed');
    //     parent.addEventListener(
    //         'transitionend',
    //         function(event) {
    //             if (parent.classList.contains('closed')) {
    //                 parent.classList.add('banner--hidden');
    //             }
    //         },
    //         false
    //     );
    // });
    // const linkButtons = Array.from(
    //     document.querySelectorAll('.banner-contact__info-link')
    // );
    // linkButtons.forEach(link =>
    //     link.addEventListener(clickEvent, e => e.preventDefault())
    // );
});

module.exports = contactHtml;
