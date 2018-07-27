const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
    template: '<div>Hello {{name}}!</div>',
    data() {
        return {
            name: 'world'
        }
    }
})

renderer.renderToString(app, (err, html) => {
    if(err) throw err
    console.log(html)
})

