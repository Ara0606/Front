import Vue from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
//import VueRouter from 'vue-router'
import routes from './router/index'

import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy);
Vue.use(VueRouter);
//Vue.use(store)

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});
new Vue({
  
    store,
    router,
    render: h => h(App),
  }).$mount('#app');
    
  



/*createApp(App)
    .use(Vuex).use(cart)
   .use(router).mount('#app')
//Vue.use(VueRouter)*/

