<template>
  <div>
    <h1>To-Do List</h1>
    <SessionManager/>
  </div>
</template>

<script>
import SessionManager from './components/SessionManager.vue'

export default {
  name: 'App',
  components: {
    SessionManager
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
