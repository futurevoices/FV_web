<template>
  <div class="block block--code">
    <pre><code :class="`language-${data.language}`">{{ data.code }}</code></pre>
  </div>
</template>
<script>
export default {
  name: 'CodeBlock',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
}
</script>
