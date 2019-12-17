<template>
  <div class="container mx-auto p-8">
    <h1
      class="uppercase font-semibold tracking-wide text-gray-600 mb-4 md:ml-xs lg:ml-sm pl-8"
    >
      Заседания
    </h1>
    <div class="md:flex">
      <div class="md:max-w-xs md:min-w-xs md:-mt-10 lg:min-w-sm lg:max-w-sm">
        <form
          @submit.prevent="addSession"
          class="flex flex-col w-full p-8 md:px-10 md:pb-10 bg-white sm:shadow max-w-sm min-w-xs rounded"
        >
          <SelectEditor
            v-bind="{
              id: 'add-session-accused',
              label: 'Обвиняемый',
              options: accusedOptions
            }"
            v-model.number="accusedId"
            required
          />
          <InputWrap
            v-bind="{
              id: 'add-session-datetime',
              label: 'Дата и время проведения'
            }"
          >
            <input
              id="add-session-datetime"
              v-model="dateTime"
              :min="minDate"
              type="datetime-local"
              class="c-input px-3"
            />
          </InputWrap>
          <TextAreaEditor
            id="add-session-address"
            v-model="address"
            required
            label="Адрес"
          />
          <AwaitButton
            :loading="status === statuses.loaing"
            type="submit"
            class="block mt-2"
          >
            Добавить заседание
          </AwaitButton>
        </form>
      </div>
      <div class="md:flex-grow pl-8">
        <div
          v-if="sessionsList && sessionsList.length"
          class="bg-white sm:shadow py-4 rounded"
        >
          <SessionItem
            v-for="item in sessionsList"
            :key="`session-${item.id}`"
            v-bind="{ item }"
          />
        </div>
        <div
          v-else
          class="py-4 px-8 border-2 border-dashed border-gray-400 text-gray-600"
        >
          Нет известных заседаний
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Deps
import { format } from 'date-fns'
import { ref, computed } from '@vue/composition-api'

// Components
import InputWrap from '~/components/editors/InputWrap'
import TextAreaEditor from '~/components/editors/TextAreaEditor'
import SelectEditor from '~/components/editors/SelectEditor'
import AwaitButton from '~/components/layout/AwaitButton'
import SessionItem from '~/components/SessionItem'

// State modules
import { createSession, useSessionsStore } from '~/store/sessions'
import { useAccusedStore } from '~/store/accused'

export default {
  components: {
    TextAreaEditor,
    SelectEditor,
    InputWrap,
    AwaitButton,
    SessionItem
  },
  setup(props, { root }) {
    const accusedStore = useAccusedStore()
    const sessionsStore = useSessionsStore()

    const now = new Date()
    const minDate = format(now, 'yyyy-MM-dd') + 'T' + format(now, 'HH:mm')

    /** Refs */
    const accusedId = ref(null)
    const dateTime = ref(minDate)
    const address = ref('')
    const status = ref('idle')

    /** Computed */
    const statuses = computed(() => ({
      idle: 'idle',
      loading: 'loading'
    }))
    const sessionsList = computed(() => sessionsStore.state.list)
    const accusedOptions = computed(() => {
      return accusedStore.state.list.map(x => ({ id: x.id, name: x.name }))
    })

    /** Functions */
    const addSession = async function() {
      status.value = statuses.value.loading

      await createSession({
        $axios: root.$axios,
        data: {
          accused_id: accusedId.value,
          date_and_time: new Date(dateTime.value).toISOString(),
          address: address.value
        }
      })

      address.value = ''
      status.value = statuses.value.idle
    }

    return {
      accusedId,
      minDate,

      // Refs
      dateTime,
      address,
      status,

      // Computed
      statuses,
      sessionsList,
      accusedOptions,

      // Functions
      addSession
    }
  }
}
</script>
