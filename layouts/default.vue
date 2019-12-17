<template>
  <div class="relative">
    <div class="absolute top-0 inset-x-0 border-t-4 border-indigo-500 z-10" />
    <Header v-if="$route.name !== 'login'" />
    <Nuxt />
  </div>
</template>

<script>
// Components
import Header from '~/components/layout/Header'

// State modules
import { fetchAccusedList } from '~/store/accused'
import { fetchSessions } from '~/store/sessions'

export default {
  components: { Header },
  setup(props, { root }) {
    fetchAccusedList(root.$axios)
    fetchSessions(root.$axios)

    return {}
  }
}
</script>
