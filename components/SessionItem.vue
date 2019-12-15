<template>
  <div class="px-8 py-3 text-gray-700 border-b border-gray-200 last:border-0">
    <div class="font-semibold">{{ dateTimeString }}</div>
    <div>{{ item.address }}</div>
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
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { computed, ref } from '@vue/composition-api'

// Components
import AwaitButton from '~/components/layout/AwaitButton'

// State modules
import { removeSession } from '~/store/sessions'

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

    const dateTimeString = computed(() => {
      if (props.item && props.item.date_and_time) {
        return format(new Date(props.item.date_and_time), 'dd MMMM в HH:mm', {
          locale: ruLocale
        })
      }
    })

    /** Functions */
    const removeItem = async function() {
      status.value = statuses.value.loading

      await removeSession({ $axios: root.$axios, id: props.item.id })

      status.value = statuses.value.idle
    }

    return {
      // Refs
      status,

      // Computed
      statuses,
      dateTimeString,

      // Function
      removeItem
    }
  }
}
</script>
