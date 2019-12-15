<template>
  <button
    :disabled="disabled || loading"
    :class="[
      variant === 'danger' ? 'c-btn--danger' : 'c-btn--action',
      { 'is-loading': loading }
    ]"
    v-on="$listeners"
    class="c-btn c-await-button relative px-8"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="c-await-button__icon absolute left-0 block ml-4 w-5 h-5 transition-out-quart transition-cheap transition-325"
    />
    <span
      :data-universal-cloak="loadingIconCloak ? true : null"
      class="c-await-button__loading-icon-wrap absolute left-0 block ml-3 w-6 h-6"
    >
      <Icon
        class="c-await-button__loading-icon w-6 h-6"
        name="icon-refresh-o"
      />
    </span>

    <span
      :class="{
        'c-await-button__text--has-icon': icon,
        'c-await-button__text--xs-shift-left': fullWidthXs
      }"
      class="c-await-button__text block transition-out-quart transition-transform transition-325"
      ><slot
    /></span>
  </button>
</template>

<script>
import Icon from '~/components/layout/Icon'

export default {
  name: 'AwaitButton',
  components: { Icon },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    fullWidthXs: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      loadingIconCloak: true
    }
  }
}
</script>

<style lang="postcss">
.c-await-button__text {
  .is-loading &,
  &.c-await-button__text--has-icon {
    transform: translateX(theme('width.3'));
  }
}

.c-await-button__text.c-await-button__text--xs-shift-left {
  .is-loading &,
  &.c-await-button__text--has-icon {
    transform: translateX(0);

    @media (min-width: theme('screens.sm')) {
      transform: translateX(theme('width.3'));
    }
  }
}

.c-await-button__icon {
  transform: translateY(-50%);
  top: 50%;

  .is-loading & {
    transform: translateY(-50%) scale(0.01);
    opacity: 0.01;
  }
}

.c-await-button__loading-icon-wrap {
  transform: translateY(-50%) scale(0.01);
  top: 50%;
  opacity: 0.01;

  .is-loading & {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
}
,
.c-await-button__loading-icon {
  .is-loading & {
    animation: spin 1s theme('transitionTimingFunction.in-sine') infinite;
  }
}
</style>
