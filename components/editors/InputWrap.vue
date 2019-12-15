<template>
  <div
    :class="isInline ? 'items-center' : 'flex-col'"
    v-on="$listeners"
    class="c-input-wrap flex max-w-sm"
  >
    <div :class="{ 'order-2': isEditorFirst }">
      <label
        :for="id"
        :class="{ 'mb-1': !isInline || hint }"
        class="block leading-tight font-semibold text-gray-700"
      >
        <span
          v-if="required"
          class="inline-block w-2 h-2 -ml-4 mr-2 rounded-full bg-red-400"
        />
        {{ label }}
      </label>
      <p
        v-if="hint"
        :id="`${id}hint`"
        class="mb-3 text-sm text-gray-600 max-w-lg"
      >
        {{ hint }}
      </p>
    </div>
    <div class="relative">
      <slot />
      <div v-if="error" class="absolute top-full text-xs mt-1 text-red-600">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputWrap',
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
    error: {
      type: String,
      default: null
    },
    isInline: {
      type: Boolean,
      default: false
    },
    isEditorFirst: {
      type: Boolean,
      default: false
    }
  }
}
</script>
