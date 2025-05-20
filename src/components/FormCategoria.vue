<template>
  
  <div class="hello">
    <h1>{{ msg }}</h1>
  
    <div v-if="formOn">
      <form @submit.prevent="this.gravar()">
      <label for="id">ID</label>
      <input disabled type="text" id="id" v-model="id" placeholder="ID da categoria">

      <label for="nome">Nome</label>
      <input type="text" id="nome" v-model="nome" placeholder="Digite o nome da categoria">

      <input type="submit" value="Cadastrar">
    </form>
    </div>
   
  </div>

  <div style="display:flex; justify-content:flex-end ;">
    <button @click="this.mostrarForm(true)">Nova Categoria</button>
  </div>
  <table id="customers">
    <thead>
      <tr>
      <th>ID</th>
      <th>Nome</th>
      <th colspan="2">Ações</th>
    </tr>
    </thead>
    
    <tbody>
      <tr v-for="cat in categorias">
      <td>{{cat.id}}</td>
      <td>{{cat.nome}}</td>
      <td><button @click="this.alterar(cat.id)">Alterar</button></td>
      <td><button @click="this.apagar(cat.id)">Apagar</button></td>
    </tr>
    </tbody>
    
    
  </table>
</template>

<script>
import axios from 'axios';
export default {
  name: "FormCategoria",
  props: {
    msg: String
  },
  data(){
    return {id:0, nome:"", formOn:false,
      categorias:[]
    }
    
  },
  
  methods:{
    mostrarForm(flag)
    {
      this.formOn = flag;
    },
    gravar(){

      const url = 'http://localhost:8080/apis/categoria';
      const data = {
        id: this.id, nome: this.nome
      };
      if (id > 0)
      {
        axios.put(url, data)
        .then(response => {
          this.carregarDados();
          
        })
        .catch(error => {
          console.log('Erro:', error);
        });
      }
      else
      {
        axios.post(url, data)
        .then(response => {
          this.carregarDados();
        })
        .catch(error => {
          console.log('Erro:', error);
        });
      }
      this.id = 0;
      this.nome = "";
      this.mostrarForm(false);
    },
    alterar(id){
      this.formOn = true;
      axios.get("http://localhost:8080/apis/categoria/"+id)
      .then(result =>{

        const categoria = result.data;
        this.id = categoria.id;
        this.nome = categoria.nome;
      })
      .catch(error =>{

      })
    },
    apagar(id){
      axios.delete("http://localhost:8080/apis/categoria/"+id)
      .then(result =>{
        this.carregarDados()
      })
      .catch(error =>{

      })
    }, 
    carregarDados(){
      axios.get("http://localhost:8080/apis/categoria")
      .then(result =>{
        this.categorias = result.data
      })
      .catch(error =>{

      })
    }
    
  },
  mounted(){
    this.carregarDados();
  }
}
</script>

<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

</style>
