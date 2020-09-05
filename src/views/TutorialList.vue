<template>
<div class="list row">
  <div class="col-md-8">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Procurar pelo Título" v-model="titulo" />
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
          Procurar
        </button>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <h4>Lista de Tutoriais</h4>
    <ul class="list-group">
      <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(tutorial, index) in tutoriais" :key="index" @click="setActiveTutorial(tutorial, index)">
        {{ tutorial.titulo }}
      </li>
    </ul>

    <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
      Excluir Todos
    </button>
  </div>
  <div class="col-md-6">
    <div v-if="currentTutorial">
      <h4>Tutorial</h4>
      <div>
        <label><strong>Título:</strong></label> {{ currentTutorial.titulo }}
      </div>
      <div>
        <label><strong>Descrição:</strong></label> {{ currentTutorial.descricao }}
      </div>
      <div>
        <label><strong>Status:</strong></label> {{ currentTutorial.publicado ? "Publicado" : "Pendente" }}
      </div>

      <a class="badge badge-warning" :href="'/tutoriais/' + currentTutorial.id">
        Editar
      </a>
    </div>
    <div v-else>
      <br />
      <p>Selecione um Tutorial...</p>
    </div>
  </div>
</div>
</template>

<script>
import TutorialService from "../services/TutorialDataService"

export default {
  name: "tutorial-list",
  data() {
    return {
      tutoriais: [],
      currentTutorial: null,
      currentIndex: -1,
      titulo: ""
    }
  },
  methods: {
    retrieveTutorials() {
      TutorialService.getAll()
        .then(res => {
          this.tutoriais = res.data
          console.log(res.data)
        })
        .catch(erro => {
          console.log(erro)
        })
    },
    refreshList() {
      this.retrieveTutorials()
      this.currentTutorial = null
      this.currentIndex = -1
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial
      this.currentIndex = index
    },
    removeAllTutorials() {
      TutorialService.deleteAll()
        .then(res => {
          console.log(res.data)
          this.refreshList()
        })
        .catch(erro => {
          console.log(erro)
        })
    },
    searchTitle() {
      TutorialService.findByTitle(this.titulo)
        .then(res => {
          this.tutoriais = res.data
          console.log(res.data)
        })
        .catch(erro => {
          console.log(erro)
        })
    },
    mounted() {
      this.retrieveTutorials();
    },
  }
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
