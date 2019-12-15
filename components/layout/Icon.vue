<template>
  <svg
    :class="
      isOutline
        ? 'fill-none stroke-current outline-icon-stroke-width'
        : 'fill-current'
    "
    :fill-rule="isOutline ? 'evenodd' : null"
    :clip-rule="isOutline ? 'evenodd' : null"
    :stroke-linecap="isOutline ? 'round' : null"
    :stroke-linejoin="isOutline ? 'round' : null"
    focusable="false"
    aria-hidden="true"
  >
    <use
      :xlink:href="`/icons.svg#${name}`"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    isOutline() {
      return this.name.split('-').pop() === 'o'
    }
  }
}
</script>
