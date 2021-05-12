<template>
  <div v-if="data.level" class="block block--heading">
    <h1 v-if="data.level === 'h1'" v-html="data.text" />
    <h2 v-if="data.level === 'h2'" v-html="data.text" />
    <h3 v-if="data.level === 'h3'" v-html="data.text" />
    <h4 v-if="data.level === 'h4'" v-html="data.text" />
    <h5 v-if="data.level === 'h5'" v-html="data.text" />
    <h6 v-if="data.level === 'h6'" v-html="data.text" />
  </div>
</template>
<script>
export default {
  name: 'HeadingBlock',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          text: null,
          level: null,
        }
      },
    },
  },
}
</script>
