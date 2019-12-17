<template>
  <div class="container mx-auto p-8">
    <h1
      class="uppercase font-semibold tracking-wide text-gray-600 mb-4 md:ml-xs lg:ml-sm pl-8"
    >
      Обвиняемые
    </h1>
    <div class="md:flex">
      <div class="md:max-w-xs md:min-w-xs md:-mt-10 lg:min-w-sm lg:max-w-sm">
        <form
          @submit.prevent="addAccussedItem"
          class="flex flex-col w-full p-8 md:px-10 md:pb-10 bg-white sm:shadow max-w-sm min-w-xs rounded"
        >
          <TextEditor
            id="add-accused-name"
            v-model="name"
            required
            label="Имя и фамилия"
          />
          <TextAreaEditor
            id="add-accused-about"
            v-model="about"
            label="Об обвиняемом"
          />
          <TextEditor
            id="add-accused-articles"
            v-model="articles"
            label="Статьи обвинения"
          />
          <TextAreaEditor
            id="add-accused-essence-of-the-charge"
            v-model="essenceOfTheCharge"
            label="Суть обвинения"
          />
          <TextAreaEditor
            id="add-accused-support-address"
            v-model="supportAddress"
            label="Адрес для поддержки"
          />
          <TextEditor
            id="add-accused-bank-account"
            v-model="bankAccount"
            label="Номер банковского счета для поддержки родных"
          />
          <AwaitButton
            :loading="status === statuses.loaing"
            type="submit"
            class="block mt-2"
          >
            Добавить обвиняемого
          </AwaitButton>
        </form>
      </div>
      <div class="md:flex-grow pl-8">
        <div
          v-if="accusedList && accusedList.length"
          class="bg-white sm:shadow py-4 rounded"
        >
          <AccusedListItem
            v-for="item in accusedList"
            :key="`session-${item.id}`"
            v-bind="{ item }"
          />
        </div>
        <div
          v-else
          class="py-4 px-8 border-2 border-dashed border-gray-400 text-gray-600"
        >
          Нет известных обвиняемых
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Deps
import { ref, computed } from '@vue/composition-api'

// Components
import TextEditor from '~/components/editors/TextEditor'
import TextAreaEditor from '~/components/editors/TextAreaEditor'
import AwaitButton from '~/components/layout/AwaitButton'
import AccusedListItem from '~/components/AccusedListItem'

// State modules
import { createAccusedItem, useAccusedStore } from '~/store/accused'

export default {
  components: { TextEditor, TextAreaEditor, AwaitButton, AccusedListItem },
  setup(props, { root }) {
    const accusedStore = useAccusedStore()

    /** Refs */
    const name = ref('Ясав Иникпуп')
    const about = ref('lorem')
    const articles = ref('212.1')
    const essenceOfTheCharge = ref('foo bar baz')
    const supportAddress = ref('197.168.1.1:8080')
    const bankAccount = ref('42')
    const status = ref('idle')

    /** Computed */
    const statuses = computed(() => ({
      idle: 'idle',
      loading: 'loading'
    }))
    const accusedList = computed(() => accusedStore.state.list)

    /** Functions */
    const addAccussedItem = async function() {
      status.value = statuses.value.loading

      await createAccusedItem({
        $axios: root.$axios,
        data: {
          name: name.value,
          about: about.value,
          articles: articles.value,
          essence_of_the_charge: essenceOfTheCharge.value,
          address_for_support: supportAddress.value,
          address_for_money_support: bankAccount.value
        }
      })

      // Cleanup
      name.value = ''
      about.value = ''
      articles.value = ''
      essenceOfTheCharge.value = ''
      supportAddress.value = ''
      bankAccount.value = ''

      status.value = statuses.value.idle
    }

    return {
      // Refs
      name,
      about,
      articles,
      essenceOfTheCharge,
      supportAddress,
      bankAccount,
      status,

      // Computed
      statuses,
      accusedList,

      // Functions
      addAccussedItem
    }
  }
}
</script>
