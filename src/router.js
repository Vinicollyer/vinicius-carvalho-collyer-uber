import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import Stops from './views/Stops.vue'
import RideOptions from './views/RideOptions.vue'
import Pickup from './views/Pickup.vue'
import Trips from './views/Trips.vue'

// Hash history: no GitHub Pages não existe fallback de rotas, então #/ evita 404 ao recarregar
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/search', name: 'search', component: Search },
    { path: '/stops', name: 'stops', component: Stops },
    { path: '/ride', name: 'ride', component: RideOptions },
    { path: '/pickup', name: 'pickup', component: Pickup },
    { path: '/trips', name: 'trips', component: Trips },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
