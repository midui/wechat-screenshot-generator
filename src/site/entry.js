/* eslint-env browser */

const content = require('./content');
const Vue = require('vue');
const mymoments = require('./templates/mymoments');


new Vue({
    el: 'body',
    components: { mymoments }
})
// window.alert(content);
