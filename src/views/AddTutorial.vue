<template>
<div class="submit-form">
  <div v-if="!submitted">
    <div class="form-group">
      <label for="titulo">Título</label>
      <input type="text" class="form-control" id="titulo" required v-model="tutorial.titulo" name="titulo" />
    </div>

    <div class="form-group">
      <label for="descricao">Descrição</label>
      <input class="form-control" id="descricao" required v-model="tutorial.descricao" name="descricao" />
    </div>

    <button @click="saveTutorial" class="btn btn-success">Enviar</button>
  </div>

  <div v-else>
    <h4>You submitted successfully!</h4>
    <button class="btn btn-success" @click="newTutorial">Novo</button>
  </div>
</div>
</template>

<script>
import TutorialService from "../services/TutorialDataService"

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        titulo: "",
        descricao: "",
        publicado: false
      },
      submited: false
    }
  },
  methods: {
    saveTutorial() {
      var data = {
        titulo: this.tutorial.titulo,
        descricao: this.tutorial.descricao
      }

      TutorialService.create(data)
        .then(res => {
          this.tutorial.id = res.data.id
          console.log(res.data)
          this.submited = true
        })
        .catch(erro => {
          console.log(erro)
        })
    },

    newTutorial() {
      this.submited = false
      this.tutorial = {}
    }
  }
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
