const bodyElement = document.querySelector('body');
const clickEvent = 'touchAction' in bodyElement.style ? 'click' : 'touchstart';
export default clickEvent;