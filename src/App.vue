<template>
<div id="app">
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <span class="navbar-brand">Danilo</span>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <a href="/" class="nav-link">Tutoriais</a>
      </li>
      <li class="nav-item">
        <a href="/novo" class="nav-link">Novo</a>
      </li>
    </div>
  </nav>

  <div class="container mt-3">
    <router-view />
  </div>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>
