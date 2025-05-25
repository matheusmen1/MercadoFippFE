import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import FormCategoria from './components/FormCategoria.vue'
import FormUsuario from './components/FormUsuario.vue'
import FormAnuncio from './components/FormAnuncio.vue'
import Menu from './components/Menu.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
     { path: '/menu', component: Menu, props: true },
     { path: '/form-categoria/:msg', component: FormCategoria, props: true },
     { path: '/form-usuario/:msg', component: FormUsuario, props: true },
     { path: '/form-anuncio/:msg', component: FormAnuncio, props: true}
    ]
    });
    
const app = createApp(App);
app.use(router);
app.mount('#app')

