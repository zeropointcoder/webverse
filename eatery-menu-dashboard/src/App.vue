<template>
  <header-view></header-view>

  <main class="my-5" style="min-height: 100vh;">
    <div class="container">
      <router-view></router-view>
    </div>
  </main>

  <footer-view></footer-view>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<script setup>
import { provide } from 'vue'
import store from './store'
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'

provide('store', store)

</script>

<style>

</style>
