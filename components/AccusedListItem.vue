<template>
  <div class="px-8 py-3 text-gray-700 border-b border-gray-200 last:border-0">
    <div>{{ item }}</div>
    <AwaitButton
      @click="removeItem"
      :loading="status === statuses.loading"
      variant="danger"
      class="mt-3"
    >
      Удалить
    </AwaitButton>
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

    return {
      // Refs
      status,

      // Computed
      statuses,

      // Function
      removeItem
    }
  }
}
</script>
