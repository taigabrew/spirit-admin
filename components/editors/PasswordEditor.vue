<template>
  <InputWrap v-bind="{ id, label, hint, required }">
    <BaseInput
      v-bind="{
        id,
        hint,
        required,
        type,
        value,
        autocomplete,
        numeric
      }"
      v-on="listenersCollection"
      @update="update"
    />
    <button
      :class="
        value
          ? 'text-indigo-500 hover:text-indigo-700 active:text-indigo-500'
          : 'text-gray-400 hover:text-gray-500 active:text-gray-400'
      "
      :title="type === 'password' ? 'Показать пароль' : 'Скрыть пароль'"
      :aria-label="type === 'password' ? 'Показать пароль' : 'Скрыть пароль'"
      @click="toggleVisiblePassword"
      name="showPassword"
      class="absolute py-2 px-3 top-1/2 align-vertical right-0 transition-colors transition-out-sine transition-250 focus:shadow-focus active:shadow-none rounded focus:outline-none"
    >
      <Icon
        :name="type === 'password' ? 'icon-eye-f' : 'icon-eye-close-f'"
        class="w-6 h-6"
      />
    </button>
  </InputWrap>
</template>

<script>
import { ref } from '@vue/composition-api'

import InputWrap from './InputWrap'
import BaseInput from './BaseInput'

import Icon from '~/components/layout/Icon'

import extractOtherListeners from '~/composables/extractOtherListeners'

export default {
  name: 'PasswordEditor',
  components: { Icon, InputWrap, BaseInput },
  inheritAttrs: false,
  model: {
    event: 'update'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    numeric: {
      type: Boolean,
      default: null
    }
  },
  setup(props, ctx) {
    const type = ref('password')
    const listenersCollection = extractOtherListeners(ctx, ['update'])

    const update = val => {
      ctx.emit('update', val)
    }

    const toggleVisiblePassword = () => {
      type.value = type.value === 'password' ? 'text' : 'password'
    }

    return {
      // Refs
      type,
      listenersCollection,

      // Functions
      update,
      toggleVisiblePassword
    }
  }
}
</script>
