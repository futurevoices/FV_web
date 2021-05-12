<template>
  <div v-if="data.text" class="block block--text" v-html="data.text" />
</template>
<script>
export default {
  name: 'TextBlock',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
}
</script>
