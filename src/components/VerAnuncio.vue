<template>
  <div class="anuncio-detalhe-container">
    <div class="anuncio-content">

      <div class="fotos-carousel" v-if="foto.length > 0">
        <img :src="`data:image/${foto[pos].extensao};base64,${foto[pos].arquivo}`" alt="Foto do anúncio" class="foto-principal"
        />
        <div class="carousel-buttons">
          <button @click="anteriorFoto" :disabled="pos === 0">Anterior</button>
          <button @click="proximaFoto" :disabled="pos === foto.length - 1">Próxima</button>
        </div>
      </div>

      <div class="anuncio-detalhes">
        <h3>{{ titulo }}</h3>
        <p class="preco">R$ {{ preco.toFixed(2) }}</p>
        <p class="descricao">{{ descricao }}</p>
        <p><strong>Categoria:</strong> {{ categoria }}</p>
        <p><strong>Vendedor:</strong> {{ usuario }}</p>
        <p class="descricao">{{ formatDate(data) }}</p>
      </div>
    </div>

    <div v-if="perguntas.length > 0 && this.privilegio <= 1 && this.cod_usuario !== this.idUsuario" style="display: flex; align-self: self-end">
      <button @click="mostrarFormPergunta(true)" class="botao" style="margin-top: 20px;"> Nova Pergunta </button>
    </div>

    <div v-else-if="perguntas.length === 0 && this.privilegio <= 1 && this.cod_usuario !== this.idUsuario">
      <button @click="mostrarFormPergunta(true)" class="botao" style="margin-top: 20px;"> Nova Pergunta </button>
    </div>

    <div class="perguntas-container" v-if="!formPerguntaOn && !formRespostaOn">

      <h4 v-if="perguntas.length > 0" class="perguntas-title" style="font-style: italic">Últimas Perguntas</h4>

      <div v-for="pergunta in perguntas" :key="pergunta.id" class="pergunta-item" style="display: flex; flex-direction: column; gap: 8px;">
        <p><strong>Pergunta:</strong> {{ pergunta.texto }} ?</p>

        <div class="resposta-item" :class="{'sem-resposta': pergunta.resposta < 0}">
          <p v-if="pergunta.resposta"><strong>Resposta:</strong> {{ pergunta.resposta }}</p>
          <p v-else class="sem-resposta">Ainda não respondido</p>
        </div>

        <div v-if="!pergunta.resposta && this.cod_usuario === this.idUsuario && this.privilegio <= 1">
          <button @click="mostrarFormResposta(true, pergunta.id)" class="botao">Responder</button>
        </div>

      </div>
    </div>

    <section v-if="formPerguntaOn" class="form-container">
      <form @submit.prevent="cadPergunta()" class="form-card">
        <div class="form-group">
          <label for="texto">Sua Pergunta</label>
          <input type="text" id="texto" v-model="texto" placeholder="Digite sua pergunta" required>
        </div>

        <div class="form-actions">
          <button type="submit" class="botao">Enviar</button>
          <button @click="mostrarFormPergunta(false)" type="button" class="botao">Cancelar</button>
        </div>
      </form>
    </section>

    <section v-if="formRespostaOn" class="form-container">
      <form @submit.prevent="cadResposta(this.idPergunta)" class="form-card">
        <div class="form-group">
          <label for="resposta">Sua Resposta</label>
          <input type="text" id="resposta" v-model="resposta" placeholder="Digite sua resposta" required>
        </div>

        <div class="form-actions">
          <button type="submit" class="botao">Enviar</button>
          <button @click="mostrarFormResposta(false)" type="button" class="botao">Cancelar</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ver-anuncio',
  data() {
    return {
      titulo: "",
      descricao: "",
      preco: 0,
      data: "",
      categoria: "",
      usuario: "",
      idUsuario: "",
      idPergunta: "",
      foto: [],
      pos: 0,
      perguntas: [],
      formPerguntaOn: false,
      formRespostaOn: false,
      texto: "",
      resposta: "",
      cod_usuario: "",
      privilegio: 2
    }
  },
  methods:{
    mostrarFormPergunta(flag)
    {
      this.formPerguntaOn = flag;
      this.texto = "";
    },
    mostrarFormResposta(flag, idPergunta)
    {
      this.formRespostaOn = flag;
      this.resposta = "";
      this.idPergunta = idPergunta;
    },
    carregarAnuncio()
    {
      const id = this.$route.params.id;
      axios.get(`http://localhost:8080/apis/anuncio/${id}`)
      .then(response => {
        const anuncio = response.data;
        this.titulo = anuncio.titulo;
        this.descricao = anuncio.descricao;
        this.preco = anuncio.preco;
        this.data = anuncio.data;
        this.usuario = anuncio.usuario.nome;
        this.idUsuario = anuncio.usuario.id;
        this.categoria = anuncio.categoria.nome;
        this.perguntas = anuncio.perguntas;
        this.foto = anuncio.foto;
      })
      .catch(error => {
        console.error('Erro ao carregar anúncio:', error);
      });
    },
    proximaFoto()
    {
      if (this.pos < this.foto.length - 1)
      {
        this.pos++;
      }
    },
    anteriorFoto()
    {
      if (this.pos > 0)
      {
        this.pos--;
      }
    },
    cadPergunta()
    {
      const id = this.$route.params.id;
      const url = `http://localhost:8080/apis/anuncio/add-pergunta/${id}/`+this.texto;
      axios
      .post(url, null,{ headers: { Authorization: localStorage.getItem("token") } })
      .then(() => {
        this.texto = "";
        this.formPerguntaOn = false;
        this.carregarAnuncio();
      })
      .catch(error => {
        console.error('Erro ao enviar pergunta:', error);
      });
    },
    cadResposta(idPergunta)
    {
      const url = `http://localhost:8080/apis/anuncio/add-resposta/${idPergunta}/`+this.resposta;
      axios
      .post(url, null,{ headers: { Authorization: localStorage.getItem("token") } })
      .then(() => {
        this.resposta = "";
        this.formRespostaOn = false;
        this.carregarAnuncio();
      })
      .catch(error => {
        console.error('Erro ao enviar resposta:', error);
      });
    },
    formatDate(dataStr) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(dataStr).toLocaleDateString('pt-BR', options);
    }
  },
  mounted() {
    this.carregarAnuncio();
    const token = localStorage.getItem("token");
    if (token)
    {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      this.cod_usuario = payload.cod_usuario;
      this.privilegio = payload.privilegio;
    }
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
  gap: 20px;
  align-items: center;
  border: 1px solid #ccc;
}

.anuncio-content {
  display: flex;
  gap: 20px;
}

.fotos-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.foto-principal {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.carousel-buttons button {
  padding: 8px 12px;
  margin: 0 5px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.carousel-buttons button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.carousel-buttons button:hover:not(:disabled) {
  background: #2980b9;
}

.anuncio-detalhes {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 15px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  border: 1px solid #ccc;
}

.anuncio-detalhes h3 {
  font-size: 2rem;
  color: #222;
  margin-bottom: 10px;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
}

.anuncio-detalhes .preco {
  font-size: 1.8rem;
  color: black;
  font-weight: bold;
}

.anuncio-detalhes .descricao {
  font-style: italic;
  color: #555;
  line-height: 1.4;
}

.anuncio-detalhes p {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.anuncio-detalhes p strong {
  color: #4caf50;
}

.perguntas-title {
  margin-top: 10px;
  font-size: 1.6rem;
  font-weight: bold;
  border-bottom: 3px solid black;
  padding-bottom: 8px;
  margin-bottom: 15px;
  color: #333;
}

.perguntas-container {
  width: 100%;
}

.pergunta-item {
  background: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.pergunta-item p {
  margin: 5px 0;
  font-size: 1.1rem;
  color: #333;
}

.resposta-item {
  margin-top: 8px;
  padding-left: 12px;
  border-left: 4px solid #4caf50;
  color: #333;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.resposta-item p {
  margin: 0;
}

.sem-resposta {
  font-style: italic;
  color: #999;
}

.form-container {
  width: 100%;
}

.form-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  border: 1px solid #ccc;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.form-actions {
  display: flex;
  gap: 10px;
}
.botao{
  padding: 8px 12px;
  margin: 0 5px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.botao:hover {
  background-color: #2980b9;
}
</style>
