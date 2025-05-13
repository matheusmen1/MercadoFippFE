<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <form-categoria msg="Cadastro de categorias"/>
</template>

<script>
import FormCategoria from './components/FormCategoria.vue'

export default {
  name: 'App',
  components: {
    FormCategoria
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
