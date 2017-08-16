// Stolen from https://gist.github.com/davidhund/b995353fdf9ce387b8a2
(function (d) {
    'use strict';
    var c = ' ', prefixFlex = 'flex -webkit-flex -ms-flexbox -moz-box -webkit-box'.split(' '), elem = d.createElement('b'), mStyle = elem.style;
    try {
        for (var i = 0, len = prefixFlex.length; i < len; i++) {
            c += ((mStyle.display = prefixFlex[i]) && mStyle.display != prefixFlex[i]) ? 'no-flex' : 'flex', (i = len);
        }
    } catch (e) {
        c += 'no-flex';
    }
    d.documentElement.className = c + 'box';
})(document);