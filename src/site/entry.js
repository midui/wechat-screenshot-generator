/* eslint import/no-unresolved:0, no-new:0 */

const Vue = require('vue');
const moments = require('./templates/moments');

new Vue({
  el: 'body',
  components: { moments },
});
// window.alert(content);
