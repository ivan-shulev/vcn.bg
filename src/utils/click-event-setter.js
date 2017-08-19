const bodyElement = document.querySelector('body');
const clickEvent = 'touchAction' in bodyElement.style ? 'click' : 'touchstart';
module.exports = clickEvent;