import { navigoReRender } from './navigo-render';
let _changeLangFunc, _route;

function changeLang() {
    return _changeLangFunc();
}

function isNewRoute(route) {
    return _route !== route;
}

export default function setChangeLang(changeLangFunc, route) {
    _changeLangFunc = changeLangFunc;
    
    // _route is undefined at first
    if(_route && isNewRoute(route)) {
        document.removeEventListener('changeLang', changeLang);
        _route = route;
    }
    else if (!_route) {
        _route = route;
    }
    document.addEventListener('changeLang', changeLang);
    document.addEventListener('changeLang', navigoReRender);
};