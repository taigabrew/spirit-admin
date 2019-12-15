<template>
  <InputWrap v-bind="{ id, label, hint, required, error }">
    <BaseInput
      v-bind="{
        id,
        hint,
        required,
        type,
        value,
        readOnly,
        autocomplete,
        error
      }"
      v-on="listeners"
      @update="update"
    />
  </InputWrap>
</template>

<script>
import InputWrap from './InputWrap'
import BaseInput from './BaseInput'

import extractOtherListeners from '~/composables/extractOtherListeners'

export default {
  name: 'TextEditor',
  components: { InputWrap, BaseInput },
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
    required: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'email', 'tel', 'search'].includes(value)
      }
    },
    error: {
      type: String,
      default: null
    }
  },
  setup(props, ctx) {
    const listeners = extractOtherListeners(ctx, ['input'])

    const update = event => {
      ctx.emit('update', event)
    }

    return { listeners, update }
  }
}
</script>
