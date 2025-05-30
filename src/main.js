import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import FormCategoria from './components/FormCategoria.vue'
import FormUsuario from './components/FormUsuario.vue'
import TabAnuncio from './components/TabAnuncio.vue'
import Menu from './components/Menu.vue'
import Logar from './components/Logar.vue'
import Cadastrar from './components/Cadastrar.vue'
import CadAnuncio from './components/CadAnuncio.vue'
import MeusAnuncios from "@/components/MeusAnuncios.vue";
import VerAnuncio from "@/components/VerAnuncio.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
     { path: '/', component: Menu, props: true },
     { path: '/form-categoria/:msg', component: FormCategoria, props: true },
     { path: '/form-usuario/:msg', component: FormUsuario, props: true },
     { path: '/tab-anuncio/:msg', component: TabAnuncio, props: true},
     { path: '/logar/:msg', component: Logar, props: true},
     { path: '/cadastrar/:msg', component: Cadastrar, props: true},
     { path: '/cad-anuncio/:msg', component: CadAnuncio, props: true},
     { path: '/meus-anuncios', component: MeusAnuncios, props: true},
     { path: '/ver-anuncio/:id', name: 'ver-anuncio', component: VerAnuncio, props: true}

    ]
    });
    
const app = createApp(App);
app.use(router);
app.mount('#app')

