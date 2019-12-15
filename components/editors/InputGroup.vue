<template>
  <section class="px-6 pt-6 pb-10 lg:px-10 lg:py-8 lg:flex">
    <div
      class="leading-tight mb-4 lg:mb-0 pb-4 lg:pb-8 lg:pt-4 border-b border-gray-200 lg:border-none lg:w-2/5 lg:pr-12"
    >
      <figure
        v-if="icon"
        class="w-10 h-10 rounded-full grid mr-3 -mt-1 lg:-mt-4 -ml-1 mb-4 text-indigo-100"
      >
        <Icon :name="icon" class="w-6 h-6 m-auto text-indigo-600" />
      </figure>
      <h2
        class="mb-1 font-semibold text-gray-700 text-lg lg:text-xl flex items-center"
      >
        {{ title }}
      </h2>
      <p class="text-gray-600">
        {{ description }}
      </p>
    </div>
    <div class="lg:w-3/4 lg:border-l border-gray-200 lg:pl-12 lg:pt-4">
      <slot />
    </div>
  </section>
</template>

<script>
import Icon from '~/components/layout/Icon'
export default {
  name: 'InputGroup',
  components: { Icon },
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      reqired: true,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
