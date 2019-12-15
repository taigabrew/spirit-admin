<template>
  <InputWrap v-bind="{ id, label, hint, required }">
    <textarea
      :id="id"
      :aria-describedby="hint ? `${id}hint` : null"
      :aria-invalid="!!error"
      :aria-required="required"
      :required="required"
      :name="id"
      :value.prop="value"
      :disabled="readOnly"
      :class="{ 'c-input--readonly': readOnly }"
      @input="update"
      @keyup.stop
      v-on="listeners"
      class="px-3 py-2 min-h-24 c-text-area"
    ></textarea>
  </InputWrap>
</template>

<script>
import InputWrap from './InputWrap'

import extractOtherListeners from '~/composables/extractOtherListeners'

export default {
  name: 'TextAreaEditor',
  components: { InputWrap },
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
    readOnly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const listeners = extractOtherListeners(ctx, ['input'])

    const update = event => {
      ctx.emit('update', event.target.value)
    }

    return { listeners, update }
  }
}
</script>
