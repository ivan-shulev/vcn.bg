function HelloWorldPlugin(options) {
    // Setup the plugin instance with options...
}

HelloWorldPlugin.prototype.apply = function (compiler) {
    const srcPath = compiler.context + '/src/pages';
    compiler.plugin("compilation", function (compilation) {
        //the main compilation instance
        //all subsequent methods are derived from compilation.plugin
        compilation.plugin('normal-module-loader', function (loaderContext, module) {
            //this is where all the modules are loaded
            //one by one, no dependencies are created yet
            if(module.resource.indexOf(srcPath) !== -1) {
                console.log(module.userRequest);
            }
            // console.log();
        });
    });
};

module.exports = HelloWorldPlugin;