<template>
  <div class="menu-container">
    <div class="header">
      <h2>Anúncios de: {{this.usuario}}</h2>
    </div>

    <div class="content">
      <ul class="anuncios-list">
        <li v-for="anuncio in anuncios" :key="anuncio.id" class="anuncio-card">
          <div class="anuncio-container">
            <img
                :src="`data:image/${anuncio.foto[0].extensao};base64,${anuncio.foto[0].arquivo}`"
                alt="Foto do anúncio"
                class="anuncio-imagem"
            />
            <div class="anuncio-detalhes">
              <h3>{{ anuncio.titulo }}</h3>
              <p class="preco">R$ {{ anuncio.preco.toFixed(2) }}</p>
              <p>{{ anuncio.categoria.nome }}</p>
            </div>
            <button @click="this.verAnuncio(anuncio.id)">Ver Anúncio</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MeusAnuncios',
  data() {
    return {
      anuncios: [],
      idUsuario: "",
      usuario:"",
    }
  },
  methods: {
    carregarAnuncios() {

        axios.get('http://localhost:8080/apis/anuncio/get-por-usuario/'+this.idUsuario)
        .then(response => {
          this.anuncios = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar anúncios:', error);
        });

    },
    verAnuncio(id)
    {
      this.$router.push({ name: 'ver-anuncio', params: { id } });
    }
  },

  mounted() {
    const token = localStorage.getItem('token');
    if (token)
    {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      this.idUsuario = payload.cod_usuario;
      this.usuario = payload.usuario;
    }

    this.carregarAnuncios();

  },
};
</script>

<style scoped>
.menu-container {
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  color: #333;
  font-size: 2rem;
  font-weight: bold;
}
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.anuncios-list {
  list-style: none;
  padding: 0;
  display: contents;
}

.anuncio-card {
  text-align: center;
}

.anuncio-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.anuncio-container:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.anuncio-imagem {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.anuncio-detalhes {
  text-align: center;
}

.anuncio-detalhes h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.anuncio-detalhes .preco {
  color: #333;
  font-size: 1rem;
  margin-right: 50%;
  font-weight: bold;
  white-space: nowrap;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>