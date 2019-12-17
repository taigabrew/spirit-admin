<template>
  <InputWrap v-bind="{ id, label, hint, required }">
    <div class="group">
      <select
        @change="update"
        v-if="options || options.length"
        :id="id"
        v-bind="{ required, value }"
        :disabled="readOnly"
        :class="{ 'c-input--readonly': readOnly }"
        class="block appearance-none c-input px-3 cursor-pointer"
      >
        <option value="-" disabled>{{
          unknownOption ? 'Выбран неизвестный вариант' : 'Выберите вариант'
        }}</option>
        <option
          v-for="item in options"
          :key="`select-${id}-${item.id}`"
          :value="item.id"
          >{{ item.name }}</option
        >
      </select>
      <div
        :class="{ 'is-loading': loading }"
        class="c-select-caret pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 bg-gray-200 group-hover:bg-depth-3 rounded-r transition-out-sine transition-bg transition-250"
      >
        <div class="h-6 w-6 c-loading-icon-wrap">
          <Icon name="icon-refresh-o" class="h-6 w-6 c-loading-icon" />
        </div>
        <Icon name="icon-angle-down-f" class="h-4 w-4 c-loading-icon-spoiler" />
      </div>
    </div>
  </InputWrap>
</template>

<script>
import { computed } from '@vue/composition-api'

import InputWrap from './InputWrap'
import Icon from '~/components/layout/Icon'

export default {
  name: 'SelectEditor',
  components: { InputWrap, Icon },
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
    required: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: null
    },
    options: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const unknownOption = computed(
      () => !props.options.find(x => x.id === props.value)
    )

    const update = function(event) {
      emit('update', event.target.value)
    }

    return { unknownOption, update }
  }
}
</script>
