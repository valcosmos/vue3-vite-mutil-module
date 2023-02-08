<script setup lang="ts">
import { ref } from 'vue'

const url = ref(import.meta.env.VITE_BASEURL)
console.log(url.value)
</script>

<template>
  <h1>m1--{{ url }}</h1>
</template>

<style scoped></style>
