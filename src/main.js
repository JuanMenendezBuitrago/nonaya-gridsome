// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/styles.scss'
import DefaultLayout from '~/layouts/Default.vue';
import store         from './data/store' ;
import VueFuse       from 'vue-fuse';
import data          from './data/house.json';

export default function (Vue, { router, head, isClient }) {
  Vue.use(VueFuse);
  Vue.component('Layout', DefaultLayout);
  Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  });


  Vue.prototype.$store = store
  Vue.prototype.$realStateData = data
}
