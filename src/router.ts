import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import Guestbook from './views/Guestbook.vue'
import About from './views/About.vue'
import Links from './views/Links.vue'
import GifCollection from './views/GifCollection.vue'
import Cart from './views/Cart.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/shop', component: Shop },
    { path: '/guestbook', component: Guestbook },
    { path: '/about', component: About },
    { path: '/links', component: Links },
    { path: '/gifs', component: GifCollection },
    { path: '/cart', component: Cart },
  ]
})
