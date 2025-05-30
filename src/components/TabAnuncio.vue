<template>
  <div class="container">

    <header class="header">
      <h1 class="title">{{ msg }}</h1>
    </header>

    <section class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendedor</th>
            <th>Titulo</th>
            <th>Descricao</th>
            <th>Preço</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="anu in anuncios" :key="anu.id">
            <td>{{ anu.id }}</td>
            <td>{{ anu.usuario.nome }}</td>
            <td>{{ anu.titulo }}</td>
            <td>{{ anu.descricao }}</td>
            <td>{{ anu.preco.toFixed(2)  }}</td>
            <td>{{ formatDate(anu.data) }}</td>
            <td class="actions">
              <button @click="this.apagar(anu.id)" class="btn btn-danger">Apagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: "TabAnuncio",
  props: {
    msg: String
  },
  data(){
    return {id:0, titulo:"", descricao:"", preco:0, data:"",
      anuncios:[]
    }
    
  },
  
  methods:{
    
    apagar(id){
      axios.delete("http://localhost:8080/apis/anuncio/"+id, { headers: { Authorization: localStorage.getItem("token") } })
      .then(result =>{
        this.carregarDados()
      })
      .catch(error =>{

      })
    }, 
    carregarDados(){
      axios.get("http://localhost:8080/apis/anuncio")
      .then(result =>{
        this.anuncios = result.data
      })
      .catch(error =>{

      })
    },
    formatDate(dataStr) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(dataStr).toLocaleDateString('pt-BR', options);
    }
    
  },
  mounted(){
    this.carregarDados();
  }
}
</script>

<style scoped>

.container {
  max-width: 900px;
  margin: 40px auto;
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
}

button.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #b02a37;
}

.table-container {
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #343a40;
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

.table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.table tr:hover {
  background-color: #e9ecef;
}

.actions button {
  margin-right: 10px;
}


</style>
