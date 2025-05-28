<template>
  <div class="login-container">
    <div class="form-wrapper">
      <header class="header">
        <h1 class="title">{{ msg }}</h1>
      </header>

      <section class="form-container">
        <form @submit.prevent="this.logar()" class="form-card">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" v-model="nome" required>
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" v-model="senha" required>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn">Entrar</button>
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
      nome: "",
      senha: ""
    };
  },
  methods: {
    logar() {
      const url = "http://localhost:8080/apis/usuario/logar";
      let data = new FormData();
      data.append("nome", this.nome);
      data.append("senha", this.senha);
      axios
      .post(url, data)
      .then(response => {
        console.log(response)
        localStorage.setItem("token", response.data)
        this.$router.push('/menu').then(() => {
        this.$root.verificarPrivilegio(); 
        });
    
      })
      .catch((error) =>{
        
        alert("Dados inválidos")
        console.log("Erro:", error)
      });
      
      this.senha = "";
      this.nome = "";
    }
  }
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
  width: 30%;
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
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.btn:hover {
  background-color: #5f5f5f;
}
</style>