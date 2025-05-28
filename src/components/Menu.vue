<template>
  <div class="menu-container">
    <h2>Últimos 5 Anúncios</h2>
    <ul class="anuncios-list">
      <li v-for="anuncio in anuncios" :key="anuncio.id" class="anuncio-card">
        <h3>{{ anuncio.titulo }}</h3>
        <img 
        :src="`data:image/${anuncio.foto[0].extensao};base64,${anuncio.foto[0].arquivo}`" 
        alt="Foto do anúncio" 
        class="anuncio-imagem" 
        />
        <p class="date">{{ formatDate(anuncio.data) }}</p>
        <p class="descricao">{{ anuncio.descricao }}</p>
        <p class="preco">Preço: R$ {{ anuncio.preco.toFixed(2) }}</p>
        <p class="categoria">Categoria: {{ anuncio.categoria.nome }}</p>
        <p class="usuario">Publicado por: {{ anuncio.usuario.nome }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Menu',
  data() {
    return {
      anuncios: [],
    };
  },
  methods: {
    carregarAnuncios() {
      axios.get('http://localhost:8080/apis/anuncio')
        .then(response => {
          console.log(response.data); 
          this.anuncios = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar anúncios:', error);
        });
    },
    formatDate(dataStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dataStr).toLocaleDateString('pt-BR', options);
    }
  },
  mounted() {
    this.carregarAnuncios();
  }
};
</script>

<style scoped>
.menu-container {
  max-width: 800px;
  margin: 30px auto;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.anuncios-list {
  list-style: none;
  padding: 0;
}

.anuncio-card {
  background: #f5f5f5;
  margin-bottom: 15px;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.anuncio-imagem {
  width: 50%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}
.anuncio-card h3 {
  margin: 0 0 8px 0;
  color: #04AA6D;
}

.date {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 10px;
}

.descricao {
  margin-bottom: 10px;
}

.preco, .categoria, .usuario {
  font-weight: 600;
  margin-bottom: 6px;
}
</style>
