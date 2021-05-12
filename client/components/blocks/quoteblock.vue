<template>
  <div v-if="data.quote" class="block block--quote">
    <figure>
      <blockquote v-html="data.quote" />
      <figcaption v-html="data.author" />
    </figure>
  </div>
</template>
<script>
export default {
  name: 'QuoteBlock',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          quote: null,
          author: null,
        }
      },
    },
  },
}
</script>
