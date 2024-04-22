// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/styles.scss'
import store         from './data/store' ;
import VueFuse       from 'vue-fuse';
import data          from './data/house.json';
import Utils         from './plugins/Utils.js';

export default function (Vue, { router, head, isClient }) {
  Vue.use(VueFuse);
  Vue.use(Utils);

  Vue.prototype.$store = store
  Vue.prototype.$realStateData = data
}
