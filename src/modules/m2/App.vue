<script setup lang="ts">
import { ref } from 'vue'

const url = ref(import.meta.env.VITE_BASEURL)
</script>

<template>
  <h1>m2--{{ url }}</h1>
</template>

<style scoped></style>
