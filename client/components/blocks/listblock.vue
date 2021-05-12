<template>
  <div v-if="data.list" class="block block--list" v-html="data.list"></div>
</template>
<script>
export default {
  name: 'ListBlock',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          list: null,
        }
      },
    },
  },
}
</script>
