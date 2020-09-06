<template>
<div class="form-submit">
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="titulo">Título</label>
      <input type="text" class="form-control" id="titulo" required v-model="tutorial.titulo" name="titulo" />
    </div>
  </div>

  <div class="form-group">
    <label for="descricao">Descrição</label>
    <input class="form-control" id="descricao" required v-model="tutorial.descricao" name="descricao" />
  </div>

  <div v-if="!submitted">
    <button @click="saveTutorial" class="btn btn-success">Enviar</button>
  </div>
  <div v-else>
    <button @click="newTutorial" class="btn btn-success">Novo</button>
    <p>{{ message }}</p>
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
      submitted: false,
      message: ''
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
          this.message = 'Tutorial "' + this.tutorial.titulo + '" salvo com sucesso!'
          this.submitted = true
        })
        .catch(erro => {
          console.log(erro)
          this.message = erro.message
        })
    },

    newTutorial() {
      this.submitted = false
      this.message = ''
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
