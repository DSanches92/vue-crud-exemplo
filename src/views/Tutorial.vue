<template>
<div v-if="currentTutorial" class="edit-form">
  <h4>Tutorial</h4>
  <form>
    <div class="form-group">
      <label for="titulo">Título</label>
      <input type="text" class="form-control" id="titulo" v-model="currentTutorial.titulo" />
    </div>
    <div class="form-group">
      <label for="descricao">Descrição</label>
      <input type="text" class="form-control" id="descricao" v-model="currentTutorial.descricao" />
    </div>

    <div class="form-group">
      <label><strong>Status:</strong></label>
      {{ currentTutorial.publicado ? "Publicado" : "Pendente" }}
    </div>
  </form>

  <button class="badge badge-primary mr-2" v-if="currentTutorial.publicado" @click="updatePublished(false)">
    Ocultar
  </button>
  <button v-else class="badge badge-primary mr-2" @click="updatePublished(true)">
    Publicar
  </button>

  <button class="badge badge-danger mr-2" @click="deleteTutorial">
    Deletar
  </button>

  <button type="submit" class="badge badge-success" @click="updateTutorial">
    Atualizar
  </button>
  <p>{{ message }}</p>
</div>

<div v-else>
  <br />
  <p>Selecione um Tutorial...</p>
</div>
</template>

<script>
import TutorialService from "../services/TutorialDataService"

export default {
  name: "tutorial-list",
  data() {
    return {
      currentTutorial: null,
      message: ''
    }
  },
  methods: {
    getTutorial(id) {
      TutorialService.get(id)
        .then(res => {
          this.currentTutorial = res.data
          console.log(res.data)
        })
        .catch(erro => {
          console.log(erro)
        })
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        titulo: this.currentTutorial.titulo,
        descricao: this.currentTutorial.descricao,
        publicado: status
      }

      TutorialService.update(this.currentTutorial.id, data)
        .then(res => {
          this.currentTutorial.publicado = status
          console.log(res.data)
        })
        .catch(erro => {
          console.log(erro)
        })
    },

    updateTutorial() {
      TutorialService.update(this.currentTutorial.id, this.currentTutorial)
        .then(res => {
          console.log(res.data)
          this.message = 'Tutorial atualizado com sucesso!'
        })
        .catch(erro => {
          console.log(erro)
        })
    },

    deleteTutorial() {
      TutorialService.delete(this.currentTutorial.id)
        .then(res => {
          console.log(res.data)
          this.$router.push({
            name: "tutoriais"
          })
        })
        .catch(erro => {
          console.log(erro)
        })
    },

    mounted() {
      this.message = ''
      this.getTutorial(this.$router.params.id)
    }
  }
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
