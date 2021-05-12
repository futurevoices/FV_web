<template>
  <div v-if="data.src" class="block block--audio">
    <figure>
      <audio controls>
        <source :src="data.src" :type="data.mime" />
        Your browser does not support the audio element.
      </audio>
      <figcaption v-if="data.caption" v-html="data.caption" />
    </figure>
  </div>
</template>
<script>
export default {
  name: 'AudioBlock',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          src: null,
          caption: null,
        }
      },
    },
  },
}
</script>
