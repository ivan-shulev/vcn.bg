import aboutHtml from './about.html';
import aboutTranslation from './abouttrans';
$(function () {
    const textHolder = $('[data-selector="about-body"]');
    textHolder.html(aboutTranslation[language]);
    $(document).on('changeLang', {},
        function (event) {
            textHolder.html(aboutTranslation[language]);
        }
    );
});
module.exports = {
    aboutHtml
};