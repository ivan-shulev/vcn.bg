module.exports = function renderMustache(initialHtml, contentToRender, template) {
    Mustache.parse(initialHtml);   // optional, speeds up future uses
    const rendered = Mustache.render(initialHtml, contentToRender);
    template.innerHTML = rendered;
};