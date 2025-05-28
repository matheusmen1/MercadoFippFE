<template>
  <div id="app">
    <nav>
      <div class="navbar-left">
        <router-link to="/menu" class="navbar-link">
          <img src="./assets/logo.jpg" alt="Logo" class="navbar-logo">
          <span class="brand-title">MercadoFipp</span>
        </router-link>
      </div>
      <div class="navbar-right">
        <div v-if="!this.autenticacao" class="dropdown">
          <button style="font-size: 20px;" class="dropbtn">Acesse sua conta</button>
          <div class="dropdown-content">
            <router-link to="/logar/Acessar Conta"> Entrar </router-link>
            <router-link to="/cadastrar/Criar Conta"> Cadastre-se </router-link>
          </div>
        </div>
        <div v-if="this.autenticacao" class="dropdown">
          <button style="font-size: 20px;" class="dropbtn">Olá, {{ this.usuario }}</button>
          <div class="dropdown-content">
            <router-link to="/logar/Acessar Conta"> Meus Anúncios </router-link>
            <a @click="this.logout()"> Sair</a>
          </div>
        </div>
        <div v-if="this.privilegio <= '1'" class="dropdown">
          <router-link style="font-size: 20px;" class="dropbtn" to="/cad-anuncio/Cadastrar Anúncio"> Anunciar</router-link>
        </div>
        <div v-if="this.privilegio === '0'" class="dropdown">
          <button style="font-size: 20px; background-color: red; border: 2px solid red; " class="dropbtn"> Módulo
            Administrativo</button>
          <div class="dropdown-content">
            <router-link to="/tab-anuncio/Anúncios">Anúncios</router-link>
            <router-link to="/form-categoria/Categorias">Categorias</router-link>
            <router-link to="/form-usuario/Usuários">Usuários</router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
   
  </div>
  

</template>

<script>
import FormCategoria from './components/FormCategoria.vue';
import FormUsuario from './components/FormUsuario.vue';
import TabAnuncio from './components/TabAnuncio.vue';
import Logar from './components/Logar.vue'
import Cadastrar from './components/Cadastrar.vue'

export default {
  name: 'App',
  data() {
    return {
      autenticacao: false,
      usuario: "",
      privilegio: '2',
    }
  },
  components: {
    FormCategoria,
    FormUsuario,
    TabAnuncio,
    Logar,
    Cadastrar
  },
  methods: {
    verificarPrivilegio() {
      const token = localStorage.getItem("token");
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        const now = Math.floor(Date.now() / 1000);
        let flag = 1;
        if (payload.exp && payload.exp < now) {
          alert("Sessão Expirada");
          this.logout();
          flag = 0;
        }
        if (flag == 1) {
          this.usuario = payload.usuario;
          this.privilegio = payload.privilegio;
          this.autenticacao = true;
        }
      }
      else {
        this.autenticacao = false;
        this.privilegio = '2';
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.autenticacao = false;
      this.privilegio = '2';
      this.$router.push('/menu')
    },
  },
  mounted() {
    this.verificarPrivilegio();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.brand-title {
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1.5px;
  background: linear-gradient(90deg, white, #868686);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.navbar-logo {
  width: 65px;
  height: 65px;
  margin-right: 10px;
}

.navbar-right a,
.dropdown .dropbtn {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  padding: 10px 15px;
  background-color: transparent;
  border: 2px solid #555;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.navbar-right a:hover,
.dropdown .dropbtn:hover {
  background-color: #333;
  border-color: #111;
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
  border: 2px solid #ddd;
  border-radius: 8px;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
  animation: fadeIn 0.3s ease;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.dropdown-content a {
  color: #333;
  padding: 8px 12px;
  text-decoration: none;
  display: block;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
