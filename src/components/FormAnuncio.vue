<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
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
        <tr v-for="anu in anuncio">
        <td>{{anu.id}}</td>
        <td>{{anu.nome}}</td>
        <td><button @click="this.apagar(anu.id)">Apagar</button></td>
      </tr>
      </tbody>
      
      
    </table>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: "FormAnuncio",
    props: {
      msg: String
    },
    data(){
      return {id:0, nome:"", formOn:false,
        anuncios:[]
      }
      
    },
    
    methods:{
      mostrarForm(flag)
      {
        this.formOn = flag;
      },
      apagar(id){
        axios.delete("http://localhost:8080/apis/anuncio/"+id)
        .then(result =>{
          this.carregarDados()
        })
        .catch(error =>{
  
        })
      }, 
      carregarDados(){
        axios.get("http://localhost:8080/apis/anuncio")
        .then(result =>{
          this.anuncio = result.data
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
  