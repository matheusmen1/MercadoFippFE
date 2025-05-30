<template>
  <div class="menu-container">
    <div class="header">
      <h2>Veja os anúncios mais recentes</h2>

      <div v-if="this.privilegio <= 1" class="search-bar">
        <input type="text" v-model="this.filtroAnuncio" placeholder="Buscar por título" />
        <button @click="this.carregarAnuncios">Buscar</button>
      </div>
    </div>

    <div v-if="this.privilegio <= 1" class="sort-buttons">
      <button @click="this.ordenar('categoria')">Ordenar por Categoria</button>
      <button @click="this.ordenar('descricao')">Ordenar por Descrição</button>
      <button @click="this.ordenar('preco')">Ordenar por Preço</button>
      <button @click="this.ordenar('titulo')">Ordenar por Título</button>
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
  name: 'Menu',
  data() {
    return {
      anuncios: [],
      filtroAnuncio: "",
      privilegio: 2,
    }
  },
  methods: {
    carregarAnuncios() {
      this.anuncios = [];
      if(this.filtroAnuncio.length > 0) // busca com filtro
      {
        axios.get('http://localhost:8080/apis/anuncio/get-anuncio/'+this.filtroAnuncio)
        .then(response => {
          let listaAnuncio = response.data;
          let i = listaAnuncio.length - 1;
          let j = 0;
          while(i >= 0 && j < 5)
          {
            this.anuncios.push(listaAnuncio[i]);
            j++;
            i--;
          }

        })
        .catch(error => {
          console.error('Erro ao carregar anúncios:', error);
        });
      }
      else
      {
        axios.get('http://localhost:8080/apis/anuncio')
        .then(response => {
          let listaAnuncio = response.data;
          let i = listaAnuncio.length - 1;
          let j = 0;
          while(i >= 0 && j < 5)
          {
            this.anuncios.push(listaAnuncio[i]);
            j++;
            i--;
          }

        })
        .catch(error => {
          console.error('Erro ao carregar anúncios:', error);
        });
      }

    },
    verAnuncio(id)
    {
      this.$router.push({ name: 'ver-anuncio', params: { id } });
    },
    ordenar(campo)
    {
      if (this.ordemAtual === campo)
      {
        this.ordemAscendente = !this.ordemAscendente;
      }
      else
      {
        this.ordemAtual = campo;
        this.ordemAscendente = true;
      }

      this.anuncios.sort((a, b) =>
      {
        let valorA = a[campo];
        let valorB = b[campo];

        if (campo === 'categoria') {
          valorA = a.categoria.nome;
          valorB = b.categoria.nome;
        }

        if (typeof valorA === 'string') {
          valorA = valorA.toLowerCase();
          valorB = valorB.toLowerCase();
        }

        if (valorA < valorB) return this.ordemAscendente ? -1 : 1;
        if (valorA > valorB) return this.ordemAscendente ? 1 : -1;
        return 0;
      });
    }

  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token)
    {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      this.privilegio = payload.privilegio;
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

.search-bar {
  display: flex;
  gap: 10px;
}

.search-bar input {
  padding: 8px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
}

.search-bar button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #2980b9;
}

.sort-buttons {
  display: flex;
  gap: 10px;
}

.sort-buttons button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.sort-buttons button:hover {
  background-color: #5f5f5f;
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
  border: 1px solid #ccc;
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
  white-space: nowrap;
}

.anuncio-detalhes h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.anuncio-detalhes .preco {
  color: #333;
  font-size: 1rem;
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