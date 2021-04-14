<template>
  <div class="relative">
    <AppContainer class="tw-pt-20">
      <div class="tw-flex tw-flex-wrap tw-items-center tw-justify-between">
        <h1
          class="z-10 tw-w-full -mb-6 tw-text-3xl tw-font-medium leading-normal tw-text-center xl:tw-text-4xl light:tw-text-light-onSurfacePrimary dark:tw-text-dark-onSurfacePrimary"
        >
          {{ $t('common.page_not_found') }}
        </h1>
        <div class="tw-w-full tw-mx-auto lg:tw-w-2/3">
          <LostImageIllustration class="tw-w-full" />
        </div>
      </div>
    </AppContainer>
  </div>
</template>

<script>
import LostImageIllustration from '~/assets/illustration/404.svg?inline'

export default {
  components: {
    LostImageIllustration,
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
