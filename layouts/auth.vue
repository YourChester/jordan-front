<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'authAdmin',
}
</script>
