<template>
  <div class="login-container">
    <div class="form-wrapper">
      <header class="header">
        <h1 class="title">{{ msg }}</h1>
      </header>

      <section class="form-container">
        <form @submit.prevent="this.cadAnuncio()" class="form-card">
          <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" id="titulo" v-model="titulo" required>
          </div>
          <div class="form-group">
            <label for="descricao">Descrição</label>
            <input type="text" id="descricao" v-model="descricao" required>
          </div>
          <div class="form-group">
              <label for="categoria">Categoria</label>
              <select v-model="Idcategoria" id="categoria" required>
                <option disabled value="">Selecione uma categoria</option>
                <option v-for="cat in categoria" :key="cat.id" :value="cat.id">
                  {{ cat.nome }}
                </option>
              </select>
          </div>
          <div class="form-group">
            <label for="data">Data</label>
            <input type="date" id="data" v-model="data" required>
          </div>
          <div class="form-group">
            <label for="preco">Preço</label>
            <input type="number" id="preco" v-model="preco" required>
          </div>
          <div class="form-group">
            <label for="fotos">Foto</label>
            <input type="file" id="fotos" v-file="fotos" required>
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
  name: "CadAnuncio",
  props: {
    msg: String,
  },
  data() {
    return {
      Idcategoria:"",
      categoria:[]
    };
  },
  methods: {
    buscarCategorias()
    {
      axios.get("http://localhost:8080/apis/categoria")
      .then(result =>{
        this.categoria = result.data
      })
      .catch(error =>{

      })
    },
    cadAnuncio() {
      const url = "http://localhost:8080/apis/anuncio";
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
  },
  mounted()
  {
    this.buscarCategorias();
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f4f4f4; 
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

.form-group input,
.form-group select {
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
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