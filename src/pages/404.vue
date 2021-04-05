<template>
  <div class="relative">
    <AppContainer class="pt-20">
      <div class="flex flex-wrap items-center justify-between">
        <h1
          class="z-10 w-full -mb-6 text-3xl font-medium leading-normal text-center xl:text-4xl light:text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary"
        >
          {{ $t('common.page_not_found') }}
        </h1>
        <div class="w-full mx-auto lg:w-2/3">
          <LostImageIllustration class="w-full" />
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
