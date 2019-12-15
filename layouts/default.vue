<template>
  <div class="relative">
    <div class="absolute top-0 inset-x-0 border-t-4 border-indigo-500 z-10" />
    <Header v-if="$route.name !== 'login'" />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/layout/Header'

export default {
  components: { Header }
}
</script>
