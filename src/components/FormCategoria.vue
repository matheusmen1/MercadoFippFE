<template>
  <div class="container">
    <header class="header">
      <h1 class="title">{{ msg }}</h1>
      <button @click="this.mostrarForm(true)" class="btn btn-primary">Nova Categoria</button>
    </header>

    <section v-if="formOn" class="form-container">
      <form @submit.prevent="this.gravar()" class="form-card">
        <div class="form-group">
          <label for="id">ID</label>
          <input disabled type="text" id="id" v-model="id" placeholder="ID da categoria">
        </div>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" id="nome" v-model="nome" placeholder="Digite o nome da categoria">
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-success">Cadastrar</button>
          <button @click="this.mostrarForm(false)" type="button" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </section>

    <section class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categorias" :key="cat.id">
            <td>{{ cat.id }}</td>
            <td>{{ cat.nome }}</td>
            <td class="actions">
              <button @click="this.alterar(cat.id)" class="btn btn-warning">Alterar</button>
              <button @click="this.apagar(cat.id)" class="btn btn-danger">Apagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "FormCategoria",
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
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.title {
  font-size: 28px;
  font-weight: bold;
}

.form-container {
  margin-bottom: 20px;
}

.form-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

button.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-warning:hover {
  background-color: #e0a800;
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