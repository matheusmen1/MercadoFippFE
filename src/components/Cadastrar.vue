<template>
  <div class="login-container">
    <div class="form-wrapper">
      <header class="header">
        <h1 class="title">{{ msg }}</h1>
      </header>

      <section class="form-container">
        <form @submit.prevent="this.gravar()" class="form-card">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" v-model="nome">
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" v-model="senha">
          </div>
          <div class="form-actions">
            <button type="submit" class="btn">Cadastrar</button>
          </div>
        </form>
        
      </section>
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "Logar",
  props: {
    msg: String,
  },
  data() {
    return {
      id: 0,
      nome: "",
      formOn: false,
      categorias: [],
    };
  },
  methods: {
    mostrarForm(flag) {
      this.formOn = flag;
    },
    gravar() {
      const url = "http://localhost:8080/apis/categoria";
      const data = { id: this.id, nome: this.nome };
      if (this.id > 0) {
        axios
          .put(url, data)
          .then(() => this.carregarDados())
          .catch((error) => console.log("Erro:", error));
      } else {
        axios
          .post(url, data)
          .then(() => this.carregarDados())
          .catch((error) => console.log("Erro:", error));
      }
      this.id = 0;
      this.nome = "";
      this.mostrarForm(false);
    },
    alterar(id) {
      this.formOn = true;
      axios
        .get(`http://localhost:8080/apis/categoria/${id}`)
        .then((result) => {
          const categoria = result.data;
          this.id = categoria.id;
          this.nome = categoria.nome;
        })
        .catch(() => {});
    },
    apagar(id) {
      axios
        .delete(`http://localhost:8080/apis/categoria/${id}`)
        .then(() => this.carregarDados())
        .catch(() => {});
    },
    carregarDados() {
      axios
        .get("http://localhost:8080/apis/categoria")
        .then((result) => (this.categorias = result.data))
        .catch(() => {});
    },
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.form-wrapper {
  width: 100%;
  max-width: 400px; 
  padding: 20px;
  background-color: #e9e9e9; 
  border-radius: 10px; 
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); 
}
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-container {
  margin-bottom: 0; 
}

.form-card {
  padding: 0; 
}

.form-group {
  margin-bottom: 20px;
}

input {
  
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button.btn 
{
  width: 100%; 
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.btn:hover {
  background-color: #5f5f5f;
}
</style>