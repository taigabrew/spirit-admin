<template>
  <div class="py-3 text-gray-700 border-b border-gray-200 last:border-0">
    <header class="px-8">{{ item.name }}</header>
    <div class="px-8">
      <p>{{ item.about }}</p>
      <p class="mb-6">{{ item.articles }}</p>
      <section class="mb-6">
        <header
          class="text-xs font-semibold uppercase tracking-wide text-gray-600"
        >
          Суть обвинения
        </header>
        <p>{{ item.essence_of_the_charge }}</p>
      </section>
      <section class="mb-6">
        <header
          class="text-xs font-semibold uppercase tracking-wide text-gray-600"
        >
          Адрес для поддержки
        </header>
        <p>{{ item.address_for_support }}</p>
      </section>
      <section class="mb-6">
        <header
          class="text-xs font-semibold uppercase tracking-wide text-gray-600"
        >
          Банковский счет для близких
        </header>
        <p>{{ item.address_for_money_support }}</p>
      </section>
    </div>
    <footer class="flex px-8">
      <button @click="edit" class="c-btn">Редактировать</button>
      <AwaitButton
        @click="removeItem"
        :loading="status === statuses.loading"
        variant="danger"
      >
        Удалить запись
      </AwaitButton>
    </footer>
  </div>
</template>

<script>
// Deps
import { computed, ref } from '@vue/composition-api'

// Components
import AwaitButton from '~/components/layout/AwaitButton'

// State modules
import { deleteAccusedItem } from '~/store/accused'

export default {
  name: 'Session',
  components: { AwaitButton },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props, { root }) {
    /** Refs */
    const status = ref('idle')

    /** Computed */
    const statuses = computed(() => ({
      idle: 'idle',
      loading: 'loading'
    }))

    /** Functions */
    const removeItem = async function() {
      status.value = statuses.value.loading

      await deleteAccusedItem({ $axios: root.$axios, id: props.item.id })

      status.value = statuses.value.idle
    }

    const edit = function() {
      console.log('Редактирова запись')
    }

    return {
      // Refs
      status,

      // Computed
      statuses,

      // Function
      removeItem,
      edit
    }
  }
}
</script>
