<script>
export default {
  name: 'App',
  components: {}
}
</script>

<script setup>
import { provide } from 'vue'
import NavbarView from './components/NavbarView.vue'
import FooterView from './components/FooterView.vue'
import store from './store'

provide('store', store)

</script>

<template>

  <navbar-view></navbar-view>

  <main class='my-5' style='min-height:100vh;'>
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
  
  <footer-view></footer-view>

</template>

