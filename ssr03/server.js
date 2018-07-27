const path = require('path');
const express = require('express');
const fs = require('fs');

const {
    createApp
} = require(path.resolve(__dirname, './dist/server/main.js'));

const clientManifest = require(path.resolve(__dirname, './dist/client/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(__dirname + '/index.template.html', 'utf-8');

const app = express();
const renderer = require('vue-server-renderer').createRenderer({
    template,
    clientManifest
});

app.use(express.static(path.resolve(__dirname, './dist/client')));

app.get('*', (req, res) => {
    let app = createApp();
    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end(JSON.stringify(err))
            return
        }
        res.end(html)
    });
});

app.listen(8000);