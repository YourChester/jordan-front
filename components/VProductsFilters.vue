<template>
  <div class="products-filters__wrapper">
    <div class="products-filters"></div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
