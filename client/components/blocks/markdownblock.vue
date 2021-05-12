<template>
  <div v-if="data.md" class="block block--markdown" v-html="data.kirbytext" />
</template>
<script>
export default {
  name: 'MarkdownBlock',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          // data gives out markdown pre-rendered with kirbytext, or raw markdown which can be rendered via js, or used raw
          md: null,
          kirbytext: null,
        }
      },
    },
  },
}
</script>
