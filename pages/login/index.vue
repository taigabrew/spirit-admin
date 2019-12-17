<template>
  <div class="h-screen grid">
    <div class="m-auto">
      <h1
        class="text-center text-2xl tracking-tight mb-8 -mt-8 text-indigo-700 font-bold"
      >
        Умная помощь. Админка
      </h1>
      <form
        @submit.prevent="login"
        class="flex flex-col w-full p-8 md:px-12 md:py-10 bg-white sm:shadow max-w-sm min-w-xs md:min-w-sm rounded"
      >
        <TextEditor
          id="username"
          v-model="username"
          label="Имя пользователя"
          required
        />
        <PasswordEditor
          id="password"
          v-model="pass"
          label="Пароль"
          required
          class="mb-8"
        />
        <AwaitButton
          :loading="status === statuses.loading"
          type="submit"
          class="self-end"
        >
          Войти
        </AwaitButton>
      </form>
    </div>
  </div>
</template>

<script>
// Deps
import md5 from 'js-md5'
import { computed, ref } from '@vue/composition-api'

// Components
import TextEditor from '~/components/editors/TextEditor'
import PasswordEditor from '~/components/editors/PasswordEditor'
import AwaitButton from '~/components/layout/AwaitButton'

// State modules
import { authorize } from '~/store/auth'

export default {
  components: {
    TextEditor,
    PasswordEditor,
    AwaitButton
  },
  setup(props, { root }) {
    /** Refs */
    const status = ref('idle')
    const username = ref('')
    const pass = ref('')

    /** Computed */
    const statuses = computed(() => ({
      idle: 'idle',
      loading: 'loading'
    }))

    /** Functions */
    const login = async function() {
      try {
        const { data } = await root.$axios({
          method: 'post',
          url: `${process.env.API_PATH}/authorization`,
          data: {
            user_name: username.value,
            password_hash: md5(pass.value)
          }
        })

        if (data) {
          authorize(data)
          root.$router.replace('/')
        }
      } catch (error) {
        console.error(error)
      }
    }

    /** Watchers */
    /** Do something */

    return {
      // Refs
      status,
      username,
      pass,

      // Computed
      statuses,

      // Functions
      login
    }
  }
}
</script>
