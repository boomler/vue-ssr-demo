const fs = require('fs');
const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(__dirname + '/index.template.html', 'utf-8')
});

server.get('*', (req, res) => {
    const app = new Vue({
        template: `<div>Hello {{name}}!</div>`,
        data: {
            name: 'World'
        }
    });

    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    });
});

server.listen(8000, () => {
    console.log('listening on 8000')
});