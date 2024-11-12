<template>
  <NavBar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup>
/*
  imports
*/
import { useStoreNotes } from '@/stores/storeNotes'
import NavBar from '@/components/Layout/NavBar.vue'
import { onMounted } from 'vue'

const storeNotes = useStoreNotes()
onMounted(() => {
  storeNotes.getNotes_subscribe()
})
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>