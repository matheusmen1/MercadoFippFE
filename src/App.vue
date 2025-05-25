<template>
  <div id="app">
    <nav>
      <div class="navbar-left">
      <router-link to="/menu" class="navbar-link">
        <img src="./assets/fipp.jpg" alt="Logo" class="navbar-logo">
        <span>MercadoFipp</span>
      </router-link>
     </div>
      <div class="navbar-right">
        <div class="dropdown">
          <button style="font-size: 20px;" class="dropbtn">Gerenciar</button>
          <div class="dropdown-content">
            <router-link to="/form-anuncio/Anúncios">Anúncio</router-link>
            <router-link to="/form-categoria/Categorias">Categoria</router-link>
            <router-link to="/form-usuario/Usuários">Usuário</router-link>
          </div>
        </div>
        <a style="font-size: 20px;" href="#logar">Logar</a>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import FormCategoria from './components/FormCategoria.vue';
import FormUsuario from './components/FormUsuario.vue';
import FormAnuncio from './components/FormAnuncio.vue';

export default {
  name: 'App',
  components: {
    FormCategoria,
    FormUsuario,
    FormAnuncio,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;
  color: white;
}

.navbar-left {
  margin-left: 2%;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.navbar-link {
  display: flex;
  align-items: center;
  text-decoration: none; 
  color: white; 
}

.navbar-link:hover {
  color: #04AA6D;
}

.navbar-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px; 
  border-radius: 50%; 
}

.navbar-right a,
.dropdown .dropbtn {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  padding: 10px 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.navbar-right a:hover,
.dropdown .dropbtn:hover {
  background-color: #111;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}


</style>
