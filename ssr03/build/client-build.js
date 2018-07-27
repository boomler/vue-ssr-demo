const webpack = require('webpack')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.resolve(__dirname, '..', './entry-client'),
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        path: path.resolve(__dirname, '..', './dist/client')
    },
    optimization: {
        splitChunks: {
            name: "manifest",
            minChunks: Infinity
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins: [
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin(),
        new VueLoaderPlugin()
    ]
}

module.exports = {
    // ...
    optimization: {
        name: 'vendor',
        minChunks: function (module) {
            // a module is extracted into the vendor chunk when...
            return (
                // if it's inside node_modules
                /node_modules/.test(module.context) &&
                // do not externalize if the request is a CSS file
                !/\.css$/.test(module.request)
            )
        }
    },
    plugins: [
        // it is common to extract deps into a vendor chunk for better caching.
        // extract webpack runtime & manifest
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        // ...
    ]
}