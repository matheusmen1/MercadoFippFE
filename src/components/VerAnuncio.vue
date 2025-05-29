<template>
  <div class="anuncio-detalhe-container">
    <h2>{{ anuncio.titulo }}</h2>
    <p class="descricao">{{ anuncio.descricao }}</p>
    <p><strong>Preço:</strong> R$ {{ anuncio.preco.toFixed(2) }}</p>
    <p><strong>Data:</strong> {{ anuncio.data }}</p>
    <p><strong>Categoria:</strong> {{ anuncio.categoria.nome }}</p>
    <p><strong>Vendedor:</strong> {{ anuncio.usuario.nome }}</p>

    <div class="fotos-container">
      <h3>Fotos do Anúncio</h3>
      <div class="fotos">
        <img
            v-for="(foto, index) in anuncio.foto"
            :key="foto.id"
            :src="`data:image/${foto.extensao || 'jpeg'};base64,${foto.arquivo}`"
            alt="Foto do Anúncio"
            class="foto"
        />
      </div>
    </div>

    <div class="perguntas-container">
      <h3>Perguntas e Respostas</h3>
      <div v-if="anuncio.perguntas.length">
        <div v-for="(pergunta, index) in anuncio.perguntas" :key="index" class="pergunta-item">
          <p><strong>Pergunta:</strong> {{ pergunta.texto }}</p>
          <p v-if="pergunta.resposta"><strong>Resposta:</strong> {{ pergunta.resposta }}</p>
          <div v-else class="responder">
            <input v-model="pergunta.respostaTemp" placeholder="Digite sua resposta..." />
            <button @click="responderPergunta(pergunta)">Responder</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Nenhuma pergunta ainda.</p>
      </div>

      <div class="nova-pergunta">
        <h4>Fazer uma pergunta:</h4>
        <textarea v-model="novaPergunta" placeholder="Escreva sua pergunta..."></textarea>
        <button @click="enviarPergunta">Enviar Pergunta</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ver-anuncio',
  data() {
    return {
      anuncio: {
        titulo: "",
        descricao: "",
        preco: 0,
        data: "",
        categoria: { nome: '' },
        usuario: { nome: '' },
        foto: [],
        perguntas: []
      },
      novaPergunta: ""
    };
  },
  methods: {
    carregarAnuncio() {
      const id = this.$route.params.id;
      axios.get(`http://localhost:8080/apis/anuncio/${id}`)
          .then(response => {
            this.anuncio = response.data;
            // adiciona campo temporário para cada pergunta
            this.anuncio.perguntas.forEach(p => p.respostaTemp = "");
          })
          .catch(error => {
            console.error('Erro ao carregar anúncio:', error);
          });
    },
    enviarPergunta() {
      const id = this.$route.params.id;
      if (!this.novaPergunta) return;

      axios.post(`http://localhost:8080/apis/anuncio/${id}/perguntas`, {
        texto: this.novaPergunta
      })
          .then(() => {
            this.novaPergunta = '';
            this.carregarAnuncio();
          })
          .catch(error => {
            console.error('Erro ao enviar pergunta:', error);
          });
    },
    responderPergunta(pergunta) {
      if (!pergunta.respostaTemp) return;

      axios.put(`http://localhost:8080/apis/perguntas/${pergunta.id}/responder`, {
        resposta: pergunta.respostaTemp
      })
          .then(() => {
            pergunta.resposta = pergunta.respostaTemp;
            pergunta.respostaTemp = '';
          })
          .catch(error => {
            console.error('Erro ao responder pergunta:', error);
          });
    }
  },
  mounted() {
    this.carregarAnuncio();
  }
};
</script>


<style scoped>

.anuncio-detalhe-container {
  max-width: 800px;
  margin: 30px auto;
  background: #f9f9f9;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h2 {
  font-size: 2rem;
  color: #333;
}

.descricao {
  font-style: italic;
  color: #555;
}

.fotos-container {
  margin-top: 20px;
}

.fotos {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.foto {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.perguntas-container {
  margin-top: 30px;
}

.pergunta-item {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.nova-pergunta, .responder {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

textarea, input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  padding: 10px 15px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #45a049;
}

</style>
